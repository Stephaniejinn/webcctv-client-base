import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import { Spin } from "antd";

import moment from "moment";

const MonthPeakTime = (props) => {
	const { activeVisualKey, trafficTotalData } = props;
	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (activeVisualKey === "7") {
			setLoading(true);
			setData([]);

			parseTotalData();
		}
	}, [trafficTotalData, activeVisualKey]);

	const parseTotalData = () => {
		var TotalData = [];

		trafficTotalData.slice(3).forEach((TrafficData) => {
			const { recordDate, totalVehiclePeak15MinuteTime } = TrafficData;
			const tempMinute = new Date(totalVehiclePeak15MinuteTime).getMinutes();

			let temp = {};
			temp["date"] = moment(recordDate).format("MM-DD");
			temp["value"] = new Date(totalVehiclePeak15MinuteTime).getHours();
			temp["minute"] =
				tempMinute === 0 ? `${tempMinute}${tempMinute}` : tempMinute;
			TotalData.push(temp);
		});
		setData(TotalData);
		setLoading(false);
	};

	var config = {
		data: Data,
		xField: "date",
		yField: "value",
		yAxis: false,

		label: {
			formatter: function formatter(v) {
				let timeStr = v["value"] + ":" + v["minute"];
				return ""
					.concat(timeStr)
					.replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
						return "".concat(s, ",");
					});
			},
		},
		point: {
			size: 5,
			shape: "diamond",
			style: {
				fill: "white",
				stroke: "#5B8FF9",
				lineWidth: 2,
			},
		},
		tooltip: false,

		state: {
			active: {
				style: {
					shadowColor: "yellow",
					shadowBlur: 4,
					stroke: "transparent",
					fill: "red",
				},
			},
		},
		theme: {
			geometries: {
				point: {
					diamond: {
						active: {
							style: {
								shadowColor: "#FCEBB9",
								shadowBlur: 2,
								stroke: "#F6BD16",
							},
						},
					},
				},
			},
		},
		interactions: [{ type: "marker-active" }],
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
export default MonthPeakTime;
