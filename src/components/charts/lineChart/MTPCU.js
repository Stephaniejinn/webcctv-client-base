import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import { Spin } from "antd";
import moment from "moment";

const MTPCULine = (props) => {
	const { activeVisualKey, trafficTotalData } = props;
	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (activeVisualKey === "2") {
			setLoading(true);
			setData([]);

			parseTotalData();
		}
	}, [trafficTotalData, activeVisualKey]);

	const parseTotalData = () => {
		var PCUTotalData = [];

		trafficTotalData.slice(3).forEach((TrafficData) => {
			const {
				recordDate,
				totalVehiclePassengerCarUnit,
				carPassengerCarUnit,
				mBusPassengerCarUnit,
				mTruckPassengerCarUnit,
				motorPassengerCarUnit,
			} = TrafficData;

			let tempCar = {};
			let tempBus = {};
			let tempTruck = {};
			let tempMotor = {};
			let tempTotal = {};
			const Time = moment(recordDate).format("MM-DD");

			tempCar["time"] = Time;
			tempCar["value"] = carPassengerCarUnit;
			tempCar["category"] = "승용차";

			tempBus["time"] = Time;
			tempBus["value"] = mBusPassengerCarUnit;
			tempBus["category"] = "버스";

			tempTruck["time"] = Time;
			tempTruck["value"] = mTruckPassengerCarUnit;
			tempTruck["category"] = "화물차";

			tempMotor["time"] = Time;
			tempMotor["value"] = motorPassengerCarUnit;
			tempMotor["category"] = "오토바이";

			tempTotal["time"] = Time;
			tempTotal["value"] = totalVehiclePassengerCarUnit;
			tempTotal["category"] = "전체";

			PCUTotalData.push(tempCar);
			PCUTotalData.push(tempBus);
			PCUTotalData.push(tempTruck);
			PCUTotalData.push(tempMotor);
			PCUTotalData.push(tempTotal);
		});
		setData(PCUTotalData);
		setLoading(false);
	};

	var config = {
		data: Data,
		xField: "time",
		yField: "value",
		seriesField: "category",
		// xAxis: { type: "time" },
		yAxis: {
			label: {
				formatter: function formatter(v) {
					return v.concat("대").replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
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

export default MTPCULine;
