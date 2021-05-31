import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import moment from "moment";
import { Spin } from "antd";

const OverSpeedCnt = (props) => {
	const { activeVisualKey, trafficTotalData } = props;

	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (activeVisualKey === "5") {
			setLoading(true);
			setData([]);

			parseTotalData();
		}
	}, [trafficTotalData, activeVisualKey]);

	const parseTotalData = () => {
		var cntTotalData = [];
		trafficTotalData.slice(3).forEach((TrafficData) => {
			const {
				recordDate,
				totalVehicleSpdVolume,
				carSpdVolume,
				mBusSpdVolume,
				mTruckSpdVolume,
				motorSpdVolume,
			} = TrafficData;
			const tempCar = {};
			const tempBus = {};
			const tempTruck = {};
			const tempMotor = {};
			const tempTotal = {};
			const Time = moment(recordDate).format("MM-DD");
			tempCar["time"] = Time;
			tempCar["value"] = carSpdVolume;
			tempCar["category"] = "승용차";

			tempBus["time"] = Time;
			tempBus["value"] = mBusSpdVolume;
			tempBus["category"] = "버스";

			tempTruck["time"] = Time;
			tempTruck["value"] = mTruckSpdVolume;
			tempTruck["category"] = "화물차";

			tempMotor["time"] = Time;
			tempMotor["value"] = motorSpdVolume;
			tempMotor["category"] = "오토바이";

			tempTotal["time"] = Time;
			tempTotal["value"] = totalVehicleSpdVolume;
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
		legend: true,
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

export default OverSpeedCnt;
