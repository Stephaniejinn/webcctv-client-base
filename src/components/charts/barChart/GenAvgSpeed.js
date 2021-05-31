import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";
import { Spin } from "antd";

const GeneralOverSpeed = (props) => {
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
			carAvgSpeed: 0,
			mBusAvgSpeed: 0,
			mTruckAvgSpeed: 0,
			motorAvgSpeed: 0,
		};
		if (page === "REALSTATISTIC") {
			trafficData.forEach((eachData) => {
				data["carAvgSpeed"] += eachData["carAvgSpeed"];
				data["mBusAvgSpeed"] += eachData["mBusAvgSpeed"];
				data["mTruckAvgSpeed"] += eachData["mTruckAvgSpeed"];
				data["motorAvgSpeed"] += eachData["motorAvgSpeed"];
			});
			let length = trafficData.length;
			data["carAvgSpeed"] = parseFloat(
				(data["carAvgSpeed"] / length).toFixed(2)
			);
			data["mBusAvgSpeed"] = parseFloat(
				(data["mBusAvgSpeed"] / length).toFixed(2)
			);
			data["mTruckAvgSpeed"] = parseFloat(
				(data["mTruckAvgSpeed"] / length).toFixed(2)
			);
			data["motorAvgSpeed"] = parseFloat(
				(data["motorAvgSpeed"] / length).toFixed(2)
			);
		} else {
			data = trafficData[0];
		}

		TotalData[0].value = data["carAvgSpeed"];
		TotalData[1].value = data["mBusAvgSpeed"];
		TotalData[2].value = data["mTruckAvgSpeed"];
		TotalData[3].value = data["motorAvgSpeed"];
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
			value: { alias: "평균속도" },
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
export default GeneralOverSpeed;
