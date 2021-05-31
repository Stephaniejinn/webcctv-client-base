import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";
import { Spin } from "antd";

const GeneralAvgSpeed = (props) => {
	const { trafficData, page } = props;

	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		setData([]);
		parseTotalData();
	}, [trafficData]);

	const parseTotalData = () => {
		var TotalData = [
			{ type: "승용차", value: 0 },
			{ type: "버스", value: 0 },
			{ type: "화물차", value: 0 },
			{ type: "오토바이", value: 0 },
		];
		var data = {
			carSpdVolume: 0,
			mBusSpdVolume: 0,
			mTruckSpdVolume: 0,
			motorSpdVolume: 0,
		};
		if (page === "STREAMING") {
			data = trafficData[trafficData.length - 1];
		} else if (page === "REALSTATISTIC") {
			trafficData.forEach((eachData) => {
				data["carSpdVolume"] += eachData["carSpdVolume"];
				data["mBusSpdVolume"] += eachData["mBusSpdVolume"];
				data["mTruckSpdVolume"] += eachData["mTruckSpdVolume"];
				data["motorSpdVolume"] += eachData["motorSpdVolume"];
			});
		} else {
			data = trafficData[0];
		}
		TotalData[0].value = data["carSpdVolume"];
		TotalData[1].value = data["mBusSpdVolume"];
		TotalData[2].value = data["mTruckSpdVolume"];
		TotalData[3].value = data["motorSpdVolume"];

		setData(TotalData);
		setLoading(false);
	};

	var config = {
		data: Data,
		xField: "type",
		yField: "value",
		autoFit: true,
		label: {
			position: "middle",
			style: {
				fill: "#FFFFFF",
				opacity: 0.6,
			},
		},
		meta: {
			type: { alias: "차종" },
			value: { alias: "과속대수" },
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
export default GeneralAvgSpeed;
