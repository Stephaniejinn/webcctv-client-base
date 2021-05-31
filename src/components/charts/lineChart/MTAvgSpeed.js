import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import { Spin } from "antd";

import moment from "moment";

const MTAvgSpeed = (props) => {
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

		trafficTotalData.slice(3).forEach((TrafficData) => {
			const {
				recordDate,
				totalVehicleAvgSpeed,
				carAvgSpeed,
				mBusAvgSpeed,
				mTruckAvgSpeed,
				motorAvgSpeed,
			} = TrafficData;
			const tempCar = {};
			const tempBus = {};
			const tempTruck = {};
			const tempMotor = {};
			const tempTotal = {};
			const Time = moment(recordDate).format("MM-DD");

			tempCar["time"] = Time;
			tempCar["value"] = carAvgSpeed;
			tempCar["category"] = "승용차";

			tempBus["time"] = Time;
			tempBus["value"] = mBusAvgSpeed;
			tempBus["category"] = "버스";

			tempTruck["time"] = Time;
			tempTruck["value"] = mTruckAvgSpeed;
			tempTruck["category"] = "화물차";

			tempMotor["time"] = Time;
			tempMotor["value"] = motorAvgSpeed;
			tempMotor["category"] = "오토바이";

			tempTotal["time"] = Time;
			tempTotal["value"] = totalVehicleAvgSpeed;
			tempTotal["category"] = "천제";

			avgSpeedTotalData.push(tempCar);
			avgSpeedTotalData.push(tempBus);
			avgSpeedTotalData.push(tempTruck);
			avgSpeedTotalData.push(tempMotor);
			avgSpeedTotalData.push(tempTotal);
		});
		setData(avgSpeedTotalData);
		setLoading(false);
	};

	var config = {
		data: Data,
		xField: "time",
		yField: "value",
		seriesField: "category",
		legend: true,
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
export default MTAvgSpeed;
