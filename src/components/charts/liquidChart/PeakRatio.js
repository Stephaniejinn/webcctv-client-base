import React, { useEffect, useState } from "react";
import { Liquid } from "@ant-design/charts";

const PeakRatio = (props) => {
	const { activeVisualKey, trafficTotalData } = props;
	const [peakRatio, setPeakRatio] = useState(0);
	useEffect(() => {
		if (activeVisualKey === "10") {
			setPeakRatio(
				trafficTotalData[0]["totalVehiclePeakHourConcentrationRatio"]
			);
		}
	}, [trafficTotalData, activeVisualKey]);

	var config = {
		percent: peakRatio,
		statistic: {
			title: {
				formatter: function formatter() {
					return "집중율";
				},
			},
			content: {
				style: {
					fontSize: 16,
					fill: "black",
				},
			},
		},
	};
	return <Liquid {...config} />;
};

export default PeakRatio;
