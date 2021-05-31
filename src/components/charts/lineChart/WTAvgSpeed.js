import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import { Spin } from "antd";

const WTAvgSpeed = (props) => {
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
		if (activeVisualKey === "4") {
			setLoading(true);
			setData([]);

			parseTotalData();
		}
	}, [trafficTotalData, activeVisualKey]);

	const parseTotalData = () => {
		var TotalData = [];

		trafficTotalData.slice(3).forEach((TrafficData) => {
			const {
				weekOption,
				carAvgSpeed,
				mBusAvgSpeed,
				mTruckAvgSpeed,
				motorAvgSpeed,
				totalVehicleAvgSpeed,
			} = TrafficData;
			let tempCar = {};
			let tempBus = {};
			let tempTruck = {};
			let tempMotor = {};
			const tempTotal = {};
			const week = WeekKey[weekOption];

			tempCar["time"] = week;
			tempCar["key"] = "승용차";
			tempCar["value"] = carAvgSpeed;

			tempBus["time"] = week;
			tempBus["key"] = "버스";
			tempBus["value"] = mBusAvgSpeed;

			tempTruck["time"] = week;
			tempTruck["key"] = "화물차";
			tempTruck["value"] = mTruckAvgSpeed;

			tempMotor["time"] = week;
			tempMotor["key"] = "오토바이";
			tempMotor["value"] = motorAvgSpeed;

			tempTotal["time"] = week;
			tempTotal["value"] = totalVehicleAvgSpeed;
			tempTotal["key"] = "전체";

			TotalData.push(tempCar);
			TotalData.push(tempBus);
			TotalData.push(tempTruck);
			TotalData.push(tempMotor);
			TotalData.push(tempTotal);
		});
		setData(TotalData);
		setLoading(false);
	};
	var config = {
		data: Data,
		xField: "time",
		yField: "value",
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
		seriesField: "key",
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
export default WTAvgSpeed;
