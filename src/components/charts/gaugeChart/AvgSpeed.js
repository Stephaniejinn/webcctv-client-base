import React, { useEffect, useState } from "react";
import { Gauge } from "@ant-design/charts";
import { Spin } from "antd";

const AvgSpeedGauge = (props) => {
	const { trafficData, page } = props;

	const [Data, setData] = useState([]);
	const [isLoadingData, setLoadingData] = useState(true);

	useEffect(() => {
		setLoadingData(true);
		setData([]);

		parseData();
	}, [trafficData]);

	const parseData = () => {
		if (page === "REALSTATISTIC") {
			let value = 0;
			trafficData.forEach((data) => {
				value += data["totalVehicleAvgSpeed"];
			});
			value = value / trafficData.length / 100;
			setData(value);
		} else {
			setData(trafficData[0]["totalVehicleAvgSpeed"] / 100);
		}
		setLoadingData(false);
	};

	var config = {
		percent: Data,
		range: {
			ticks: [0, 1 / 3, 2 / 3, 1],
			color: ["#F4664A", "#FAAD14", "#30BF78"],
		},
		indicator: {
			pointer: { style: { stroke: "#D0D0D0", lineWidth: 2 } },
			pin: null,
		},
		axis: {
			label: {
				formatter: function formatter(v) {
					return Number(v) * 100;
				},
				style: { fontSize: 10 },
			},
			// subTickLine: { count: 3 },
		},
		statistic: {
			content: {
				formatter: function formatter(_ref) {
					return (_ref.percent * 100).toFixed(2) + " km/h";
				},
				style: {
					fontSize: "14px",
					lineHeight: "30px",
				},
			},
		},
	};
	return (
		<>
			{isLoadingData ? (
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
				<Gauge {...config} />
			)}
		</>
	);
};

export default AvgSpeedGauge;
