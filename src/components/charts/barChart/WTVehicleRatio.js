import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";
import { Spin } from "antd";

const VehicleRatio = (props) => {
	const { activeVisualKey, trafficTotalData } = props;
	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const WeekKey = {
		SUN: "일요일",
		MON: "월요일",
		TUE: "화요일",
		WED: "수요일",
		THU: "목요일",
		FRI: "금요일",
		SAT: "토요일",
		ALL: "전체",
		DAY: "평일전체",
		END: "주말전체",
	};

	useEffect(() => {
		if (activeVisualKey === "3") {
			setLoading(true);
			setData([]);

			parseTotalData();
		}
	}, [trafficTotalData, activeVisualKey]);

	const parseTotalData = () => {
		var carRatio = [];
		var busRatio = [];
		var truckRatio = [];
		var motorRatio = [];
		var RatioTotalData = [];
		trafficTotalData.slice(3).forEach((TrafficData) => {
			const {
				weekOption,
				carVehicleRatio,
				mBusVehicleRatio,
				mTruckVehicleRatio,
				motorVehicleRatio,
			} = TrafficData;
			let tempCar = {};
			let tempBus = {};
			let tempTruck = {};
			let tempMotor = {};

			tempCar["time"] = WeekKey[weekOption];
			tempCar["value"] = parseFloat((carVehicleRatio * 100).toFixed(2));
			tempCar["type"] = "승용차";

			tempBus["time"] = WeekKey[weekOption];
			tempBus["value"] = parseFloat((mBusVehicleRatio * 100).toFixed(2));
			tempBus["type"] = "버스";

			tempTruck["time"] = WeekKey[weekOption];
			tempTruck["value"] = parseFloat((mTruckVehicleRatio * 100).toFixed(2));
			tempTruck["type"] = "화물차";

			tempMotor["time"] = WeekKey[weekOption];
			tempMotor["value"] = parseFloat((motorVehicleRatio * 100).toFixed(2));
			tempMotor["type"] = "오토바이";

			carRatio.push(tempCar);
			busRatio.push(tempBus);
			truckRatio.push(tempTruck);
			motorRatio.push(tempMotor);
		});
		RatioTotalData = carRatio.concat(
			busRatio.concat(truckRatio.concat(motorRatio))
		);
		setData(RatioTotalData);
		setLoading(false);
	};

	var config = {
		data: Data,
		isStack: true,
		xField: "time",
		yField: "value",
		seriesField: "type",
		yAxis: {
			label: {
				formatter: function formatter(v) {
					return v.concat("%").replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
						return "".concat(s, ",");
					});
				},
			},
		},
		label: {
			position: "middle",
			layout: [
				{ type: "interval-adjust-position" },
				{ type: "interval-hide-overlap" },
				{ type: "adjust-color" },
			],
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
				<Column {...config} />
			)}
		</>
	);
};
export default VehicleRatio;
