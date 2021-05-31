import React, { useState, useEffect } from "react";
import { BidirectionalBar } from "@ant-design/charts";
import { Spin } from "antd";

const MyBidirectionalBar = (props) => {
	const { activeVisualKey, trafficTotalData } = props;
	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (activeVisualKey === "6") {
			setLoading(true);
			setData([]);
			parseTotalData();
		}
	}, [trafficTotalData, activeVisualKey]);

	const parseTotalData = () => {
		var dataSample = [
			{
				차종: "승용차",
				"주간 12시간 교통량": 0,
				"야간 12시간 교통량": 0,
			},
			{
				차종: "버스",
				"주간 12시간 교통량": 0,
				"야간 12시간 교통량": 0,
			},
			{
				차종: "화물차",
				"주간 12시간 교통량": 0,
				"야간 12시간 교통량": 0,
			},
			{
				차종: "이륜차",
				"주간 12시간 교통량": 0,
				"야간 12시간 교통량": 0,
			},
		];
		var trafficData = trafficTotalData[0];

		dataSample[0]["야간 12시간 교통량"] = trafficData["carNighttimeVolume"];
		dataSample[1]["야간 12시간 교통량"] = trafficData["mBusNighttimeVolume"];
		dataSample[2]["야간 12시간 교통량"] = trafficData["mTruckNighttimeVolume"];
		dataSample[3]["야간 12시간 교통량"] = trafficData["motorNighttimeVolume"];

		dataSample[0]["주간 12시간 교통량"] = trafficData["carDaytimeVolume"];
		dataSample[1]["주간 12시간 교통량"] = trafficData["mBusDaytimeVolume"];
		dataSample[2]["주간 12시간 교통량"] = trafficData["mTruckDaytimeVolume"];
		dataSample[3]["주간 12시간 교통량"] = trafficData["motorDaytimeVolume"];
		setData(dataSample);
		setLoading(false);
	};

	var config = {
		data: Data,
		width: 400,
		height: 400,
		xField: "차종",
		xAxis: { position: "bottom" },
		interactions: [{ type: "active-region" }],
		yField: ["주간 12시간 교통량", "야간 12시간 교통량"],
		tooltip: {
			shared: true,
			showMarkers: false,
		},
	};
	return (
		<>
			{isLoading ? (
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
				<BidirectionalBar {...config} />
			)}
		</>
	);
};

export default MyBidirectionalBar;
