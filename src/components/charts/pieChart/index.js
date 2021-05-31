import React, { useEffect } from "react";
import { Pie } from "@ant-design/charts";
const DemoPie = () => {
	let ref;
	var data = [
		{
			type: "分类一",
			value: 27,
		},
		{
			type: "分类二",
			value: 25,
		},
		// {
		// 	type: "分类三",
		// 	value: 18,
		// },
		// {
		// 	type: "分类四",
		// 	value: 15,
		// },
		// {
		// 	type: "分类五",
		// 	value: 10,
		// },
		// {
		// 	type: "其他",
		// 	value: 5,
		// },
	];
	var config = {
		appendPadding: 10,
		data: data,
		angleField: "value",
		colorField: "type",
		radius: 0.6,
		legend: false,
		label: {
			type: "inner",
			offset: "-30%",
			content: "{name}",
			style: {
				fontSize: 12,
				textAlign: "center",
			},
		},
		state: {
			active: {
				style: {
					lineWidth: 0,
					fillOpacity: 0.65,
				},
			},
		},
		interactions: [{ type: "element-selected" }, { type: "element-active" }],
	};

	return <Pie {...config} chartRef={(chartRef) => (ref = chartRef)} />;
};
export default DemoPie;
