import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/charts";
import { Spin } from "antd";

const VehicleRatio = (props) => {
	const { trafficData, page } = props;
	const [Data, setData] = useState([]);
	const [isLoadingData, setLoadingData] = useState(true);

	useEffect(() => {
		setLoadingData(true);
		setData([]);
		parseTraffic();
	}, [trafficData]);

	const parseTraffic = () => {
		var vehicleRatioData = [
			{
				type: "승용차",
				value: 0,
			},
			{
				type: "버스",
				value: 0,
			},
			{
				type: "화물차",
				value: 0,
			},
			{
				type: "오토바이",
				value: 0,
			},
		];
		var data = { carVolume: 0, mBusVolume: 0, mTruckVolume: 0, motorVolume: 0 };
		if (page === "STREAMING") {
			data = trafficData[trafficData.length - 1];
		} else if (page === "REALSTATISTIC") {
			trafficData.forEach((eachData) => {
				data["carVolume"] += eachData["carVolume"];
				data["mBusVolume"] += eachData["mBusVolume"];
				data["mTruckVolume"] += eachData["mTruckVolume"];
				data["motorVolume"] += eachData["motorVolume"];
			});
		} else {
			data = trafficData[0];
		}
		vehicleRatioData[0].value = data["carVolume"];
		vehicleRatioData[1].value = data["mBusVolume"];
		vehicleRatioData[2].value = data["mTruckVolume"];
		vehicleRatioData[3].value = data["motorVolume"];

		setData(vehicleRatioData);
		setLoadingData(false);
	};
	var config = {
		appendPadding: 0,
		data: Data,
		angleField: "value",
		colorField: "type",
		radius: 1,
		innerRadius: 0.46,
		legend: true,
		label: {
			type: "inner",
			offset: "-54%",
			content: "{value}대",
			autoRotate: false,

			style: {
				textAlign: "center",
				fontSize: 10,
			},
		},
		interactions: [{ type: "element-selected" }, { type: "element-active" }],
		statistic: {
			title: false,
			content: {
				style: {
					whiteSpace: "pre-wrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
					fontSize: 14,
				},
				value: {
					formatter: function formatter(v) {
						return "".concat(v, "대");
					},
				},
			},
		},
	};
	return (
		<>
			{isLoadingData ? (
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
				<Pie {...config} />
			)}
		</>
	);
};

export default VehicleRatio;
