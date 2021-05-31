import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import { Spin } from "antd";

import moment from "moment";

// import axios from "axios";
// import { connect } from "react-redux";
// import * as actions from "../../../actions";

const VehicleRatio = (props) => {
	const { activeVisualKey, trafficTotalData } = props;

	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (activeVisualKey === "3") {
			setLoading(true);
			setData([]);

			parseTotalData();
		}
	}, [trafficTotalData, activeVisualKey]);

	const parseTotalData = () => {
		var TotalData = [];

		trafficTotalData.slice(3).forEach((TrafficData) => {
			const {
				recordDate,
				carVehicleRatio,
				mBusVehicleRatio,
				mTruckVehicleRatio,
				motorVehicleRatio,
			} = TrafficData;
			let tempCar = {};
			let tempBus = {};
			let tempTruck = {};
			let tempMotor = {};
			const Time = moment(recordDate).format("MM-DD");

			tempCar["time"] = Time;
			tempCar["value"] = parseFloat((carVehicleRatio * 100).toFixed(2));

			tempCar["category"] = "승용차";

			tempBus["time"] = Time;
			tempBus["value"] = parseFloat((mBusVehicleRatio * 100).toFixed(2));
			tempBus["category"] = "버스";

			tempTruck["time"] = Time;
			tempTruck["value"] = parseFloat((mTruckVehicleRatio * 100).toFixed(2));
			tempTruck["category"] = "화물차";

			tempMotor["time"] = Time;
			tempMotor["value"] = parseFloat((motorVehicleRatio * 100).toFixed(2));
			tempMotor["category"] = "오토바이";
			TotalData.push(tempCar);
			TotalData.push(tempBus);
			TotalData.push(tempTruck);
			TotalData.push(tempMotor);
		});
		setData(TotalData);
		setLoading(false);
	};

	var config = {
		data: Data,
		xField: "time",
		yField: "value",
		seriesField: "category",
		yAxis: {
			label: {
				formatter: function formatter(v) {
					return v.concat("%").replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
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

export default VehicleRatio;
