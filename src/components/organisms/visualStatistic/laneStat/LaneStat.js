import React, { useState, useEffect } from "react";
import { Spin, Typography, message } from "antd";

import axios from "axios";
import { connect } from "react-redux";

import LaneTableCard from "../../../molecules/tableCard/LaneTableCard";
import LaneDataVisualization from "../../../molecules/dataVisualization/LaneDataVisualization";
import "../style.less";

const LaneVisualization = (props) => {
	const {
		period,
		startDate,
		endTime,
		cameraCode,
		baseURL,
		trafficURL,
		additionalFilter,
		setLoggedIn,
	} = props;
	const { Text } = Typography;

	const [activeVisualKey, setActiveVisualKey] = useState("1");

	const [isLoadingTrafficTotal, setLoadingTrafficTotal] = useState(true);
	const [isEmptyData, setEmptyData] = useState(false);
	const [trafficTotalData, setTrafficTotalData] = useState([]);

	const periodURL =
		period === "DAY" ? "/daily" : period === "WEEK" ? "/weekly" : "/monthly";

	const currentURL =
		period === "DAY"
			? `${baseURL}${trafficURL}${periodURL}?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&axis=lane`
			: `${baseURL}${trafficURL}${periodURL}?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&axis=lane&weekOption=${additionalFilter}`;

	useEffect(() => {
		setEmptyData(false);
		setLoadingTrafficTotal(true);
		setTrafficTotalData([]);
		getTrafficTotalData();
	}, [cameraCode, startDate, endTime, additionalFilter]);

	const getTrafficTotalData = () => {
		axios
			.get(`${currentURL}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				setTrafficTotalData(res.data);
				if (res.data.length !== 0) {
					setLoadingTrafficTotal(false);
					setEmptyData(false);
				} else {
					setEmptyData(true);
					message.warning("해당 기간 차선 별 데이터가 없습니다");
				}
			})
			.catch((err) => {
				console.log(err.response);
				setEmptyData(true);
				if (err.response.status === 401) {
					setLoggedIn(false);
				} else if (err.response.status === 500) {
					message.error(
						"네트워크 문제 혹은 일시적인 오류로 페이지를 불러올 수 없습니다"
					);
				} else {
					message.warning("해당 기간 차선 별 데이터가 없습니다");
				}
			});
	};

	return (
		<>
			{!isEmptyData ? (
				isLoadingTrafficTotal ? (
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
						<LaneDataVisualization
							period={period}
							activeVisualKey={activeVisualKey}
							setActiveVisualKey={setActiveVisualKey}
							trafficTotalData={trafficTotalData}
						/>
						<LaneTableCard
							period={period}
							tableKey="first"
							startDate={startDate}
							endTime={endTime}
							trafficTotalData={trafficTotalData}
						/>
					</>
				)
			) : null}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
		camLanes: state.locationCode.camLanes,
		baseURL: state.baseURL.baseURL,
		trafficURL: state.baseURL.trafficURL,
	};
};

export default connect(mapStateToProps)(LaneVisualization);
