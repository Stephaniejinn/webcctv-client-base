import React, { useEffect, useState } from "react";
import { Spin, message } from "antd";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";

import VisualizationCard from "../../molecules/genVisualizationCard/GenVisualizationCard";
import VehicleRatio from "../../charts/doughnutChart/VehicleRatio";
import AvgSpeedGauge from "../../charts/gaugeChart/AvgSpeed";
import AvgSpeedBar from "../../charts/barChart/GenAvgSpeed";
import OverSpeedBar from "../../charts/barChart/GenOverSpeed";

import "./style.less";

const GeneralVisualization = (props) => {
	const {
		period,
		page,
		startDate,
		endTime,
		currentTime,
		cameraCode,
		baseURL,
		trafficURL,
		refresh,
		setLoggedIn,
	} = props;
	const [isLoadingTraffic, setLoadingTraffic] = useState(true);
	const [isEmptyData, setEmptyData] = useState(false);
	const [trafficData, setTrafficData] = useState([]);
	const [curEndTime, setCurEndTime] = useState("");

	var camCode = cameraCode.length === 0 ? "0001" : cameraCode;

	var curTime = currentTime ? currentTime : "23:59:59";
	const periodURL =
		period === "DAY" ? "/daily" : period === "WEEK" ? "/weekly" : "/monthly";
	const title = page === "REALSTATISTIC" ? `| 00:00 ~ ${curEndTime} ` : "";

	useEffect(() => {
		setEmptyData(false);
		setLoadingTraffic(true);
		setTrafficData([]);
		getTrafficData();
	}, [camCode, startDate, endTime, currentTime]);

	useEffect(() => {
		if (refresh) {
			setEmptyData(false);
			setLoadingTraffic(true);
			setTrafficData([]);
			getTrafficData();
		}
	}, [refresh]);

	const getTrafficData = () => {
		axios
			.get(
				`${baseURL}${trafficURL}${periodURL}?camCode=${camCode}&startDate=${startDate}&endTime=${endTime} ${curTime}&axis=time&laneNumber=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				if (res.data.length !== 0) {
					setTrafficData(res.data);
					setCurEndTime(
						moment(new Date(res.data[res.data.length - 1].recordTime))
							.add(15, "m")
							.format("HH:mm")
					);
					setLoadingTraffic(false);
					setEmptyData(false);
				} else {
					setEmptyData(true);
					message.warning("?????? ?????? ?????? ??? ???????????? ????????????");
				}
			})
			.catch((err) => {
				console.log(err.response);
				setEmptyData(true);
				if (err.response.status === 500) {
					message.error(
						"???????????? ?????? ?????? ???????????? ????????? ???????????? ????????? ??? ????????????"
					);
				} else if (err.response.status === 400) {
					if (
						!new Date(endTime).getTime() >=
						new Date(moment(new Date()).format("YYYY-MM-DD")).getTime()
					)
						message.warning("?????? ?????? ?????? ??? ???????????? ????????????");
				} else if (err.response.status === 401) {
					message.warning(
						"????????? ????????? ???????????? ????????????. ?????? ?????????????????????"
					);
					setLoggedIn(false);
				}
			});
	};

	return (
		<div className="general-graph-layout">
			{!isEmptyData ? (
				isLoadingTraffic ? (
					<div
						style={{
							marginTop: 20,
							marginBottom: 20,
							textAlign: "center",
							paddingTop: 30,
							paddingBottom: 30,
						}}
					>
						<Spin size="large" />
					</div>
				) : (
					<>
						<div className="general-graph-card">
							<VisualizationCard
								title={`????????? ????????? ${title}`}
								chart={<VehicleRatio trafficData={trafficData} page={page} />}
							/>
							<VisualizationCard
								title={`????????? ???????????? ${title}`}
								chart={<OverSpeedBar trafficData={trafficData} page={page} />}
							/>
						</div>
						<div className="general-graph-card">
							<VisualizationCard
								title={`???????????? ${title}`}
								chart={<AvgSpeedGauge trafficData={trafficData} page={page} />}
							/>
							<VisualizationCard
								title={`????????? ???????????? ${title}`}
								chart={<AvgSpeedBar trafficData={trafficData} page={page} />}
							/>
						</div>
					</>
				)
			) : null}
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
		baseURL: state.baseURL.baseURL,
		trafficURL: state.baseURL.trafficURL,
	};
};

export default connect(mapStateToProps)(GeneralVisualization);
