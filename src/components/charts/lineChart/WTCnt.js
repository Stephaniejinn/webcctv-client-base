import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import { Spin } from "antd";

const WTCnt = (props) => {
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
		if (activeVisualKey === "1") {
			setLoading(true);
			setData([]);

			parseTotalData();
		}
	}, [trafficTotalData, activeVisualKey]);

	const parseTotalData = () => {
		var cntTotalData = [];
		trafficTotalData.slice(3).forEach((TrafficData) => {
			const {
				weekOption,
				carVolume,
				mBusVolume,
				mTruckVolume,
				motorVolume,
				totalVehicleVolume,
			} = TrafficData;
			let tempCar = {};
			let tempBus = {};
			let tempTruck = {};
			let tempMotor = {};
			const tempTotal = {};
			const week = WeekKey[weekOption];
			tempCar["time"] = week;
			tempCar["category"] = "승용차";
			tempCar["value"] = carVolume;

			tempBus["time"] = week;
			tempBus["category"] = "버스";
			tempBus["value"] = mBusVolume;

			tempTruck["time"] = week;
			tempTruck["category"] = "화물차";
			tempTruck["value"] = mTruckVolume;

			tempMotor["time"] = week;
			tempMotor["category"] = "오토바이";
			tempMotor["value"] = motorVolume;

			tempTotal["time"] = week;
			tempTotal["value"] = totalVehicleVolume;
			tempTotal["category"] = "전체";

			cntTotalData.push(tempCar);
			cntTotalData.push(tempBus);
			cntTotalData.push(tempTruck);
			cntTotalData.push(tempMotor);
			cntTotalData.push(tempTotal);
		});
		setData(cntTotalData);
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
					return v.concat("대").replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
						return "".concat(s, ",");
					});
				},
			},
		},
		legend: true,
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
export default WTCnt;
