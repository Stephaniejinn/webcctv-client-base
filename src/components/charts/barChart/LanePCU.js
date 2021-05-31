import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";
import { Spin } from "antd";

const PCU = (props) => {
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
		var PCUCar = [];
		var PCUBus = [];
		var PCUTruck = [];
		var PCUMotor = [];
		var PCUTotalData = [];
		trafficTotalData.slice(1).forEach((TrafficData) => {
			const {
				laneNumber,
				carPassengerCarUnit,
				mBusPassengerCarUnit,
				mTruckPassengerCarUnit,
				motorPassengerCarUnit,
			} = TrafficData;
			const tempCar = {};
			const tempBus = {};
			const tempTruck = {};
			const tempMotor = {};

			tempCar["laneNum"] = `${laneNumber.toString()} 차선`;
			tempCar["value"] = carPassengerCarUnit;
			tempCar["type"] = "승용차";

			tempBus["laneNum"] = `${laneNumber.toString()} 차선`;
			tempBus["value"] = mBusPassengerCarUnit;
			tempBus["type"] = "버스";

			tempTruck["laneNum"] = `${laneNumber.toString()} 차선`;
			tempTruck["value"] = mTruckPassengerCarUnit;
			tempTruck["type"] = "화물차";

			tempMotor["laneNum"] = `${laneNumber.toString()} 차선`;
			tempMotor["value"] = motorPassengerCarUnit;
			tempMotor["type"] = "오토바이";
			PCUCar.push(tempCar);
			PCUBus.push(tempBus);
			PCUTruck.push(tempTruck);
			PCUMotor.push(tempMotor);
		});
		PCUTotalData = PCUCar.concat(PCUBus.concat(PCUTruck.concat(PCUMotor)));
		setData(PCUTotalData);
		setLoading(false);
	};

	var config = {
		data: Data,
		isStack: true,
		xField: "laneNum",
		yField: "value",
		seriesField: "type",
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
export default PCU;
