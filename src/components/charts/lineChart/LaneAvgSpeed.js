import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import { Spin } from "antd";

const AvgSpeedLine = (props) => {
	const { activeVisualKey, trafficTotalData } = props;

	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (activeVisualKey === "4") {
			setLoading(true);
			setData([]);

			parseTotalData();
		}
	}, [trafficTotalData, activeVisualKey]);

	const parseTotalData = () => {
		var avgSpeedTotalData = [];

		trafficTotalData.slice(1).forEach((TrafficData) => {
			const {
				laneNumber,
				carAvgSpeed,
				mBusAvgSpeed,
				mTruckAvgSpeed,
				motorAvgSpeed,
			} = TrafficData;

			let tempCar = {};
			let tempBus = {};
			let tempTruck = {};
			let tempMotor = {};

			tempCar["lane"] = `${laneNumber.toString()} 차선`;
			tempCar["value"] = carAvgSpeed;
			tempCar["category"] = "승용차";

			tempBus["lane"] = `${laneNumber.toString()} 차선`;
			tempBus["value"] = mBusAvgSpeed;
			tempBus["category"] = "버스";

			tempTruck["lane"] = `${laneNumber.toString()} 차선`;
			tempTruck["value"] = mTruckAvgSpeed;
			tempTruck["category"] = "화물차";

			tempMotor["lane"] = `${laneNumber.toString()} 차선`;
			tempMotor["value"] = motorAvgSpeed;
			tempMotor["category"] = "오토바이";

			avgSpeedTotalData.push(tempCar);
			avgSpeedTotalData.push(tempBus);
			avgSpeedTotalData.push(tempTruck);
			avgSpeedTotalData.push(tempMotor);
		});
		setData(avgSpeedTotalData);
		setLoading(false);
	};

	var config = {
		data: Data,
		xField: "lane",
		yField: "value",
		seriesField: "category",
		yAxis: {
			label: {
				formatter: function formatter(v) {
					return v
						.concat("km/h")
						.replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
							return "".concat(s, ",");
						});
				},
			},
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
				<Line {...config} />
			)}
		</>
	);
};
export default AvgSpeedLine;
