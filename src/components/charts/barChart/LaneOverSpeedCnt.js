import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";
import { Spin } from "antd";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

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
		var cntCar = [];
		var cntBus = [];
		var cntTruck = [];
		var cntMotor = [];
		var cntTotalData = [];
		trafficTotalData.slice(1).forEach((TrafficData) => {
			const {
				laneNumber,
				carSpdVolume,
				mBusSpdVolume,
				mTruckSpdVolume,
				motorSpdVolume,
			} = TrafficData;

			const tempCar = {};
			const tempBus = {};
			const tempTruck = {};
			const tempMotor = {};

			tempCar["laneNum"] = `${laneNumber.toString()} 차선`;
			tempCar["value"] = carSpdVolume;
			tempCar["type"] = "승용차";

			tempBus["laneNum"] = `${laneNumber.toString()} 차선`;
			tempBus["value"] = mBusSpdVolume;
			tempBus["type"] = "버스";

			tempTruck["laneNum"] = `${laneNumber.toString()} 차선`;
			tempTruck["value"] = mTruckSpdVolume;
			tempTruck["type"] = "화물차";

			tempMotor["laneNum"] = `${laneNumber.toString()} 차선`;
			tempMotor["value"] = motorSpdVolume;
			tempMotor["type"] = "오토바이";
			cntCar.push(tempCar);
			cntBus.push(tempBus);
			cntTruck.push(tempTruck);
			cntMotor.push(tempMotor);
		});
		cntTotalData = cntCar.concat(cntBus.concat(cntTruck.concat(cntMotor)));
		setData(cntTotalData);
		setLoading(false);
	};

	var config = {
		data: Data,
		isStack: true,
		xField: "laneNum",
		yField: "value",
		seriesField: "type",
		yAxis: {
			label: {
				formatter: function formatter(v) {
					return v.concat("대").replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
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
export default OverSpeedCnt;
