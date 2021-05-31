import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import { Spin } from "antd";

import moment from "moment";
import { unstable_batchedUpdates } from "react-dom";

const Pedestrians = (props) => {
	const { activeVisualKey, trafficTotalData } = props;
	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	var DTPedestrians = [];

	useEffect(() => {
		if (activeVisualKey === "11") {
			setLoading(true);
			setData([]);
			parseTotalData();
		}
	}, [trafficTotalData, activeVisualKey]);

	const parseTotalData = () => {
		trafficTotalData.slice(1).forEach((pedestrianData) => {
			const { recordTime, pedestrianVolume, jaywalkVolume } = pedestrianData;

			const totalTemp = {};
			const personTemp = {};
			const jaywalkTemp = {};

			const timeTemp = moment(recordTime).format("HH:mm");
			const personCnt = pedestrianVolume - jaywalkVolume;

			totalTemp["date"] = timeTemp;
			totalTemp["type"] = "총 보행자";
			totalTemp["value"] = pedestrianVolume;

			personTemp["date"] = timeTemp;
			personTemp["type"] = "보행자";
			personTemp["value"] = personCnt;

			jaywalkTemp["date"] = timeTemp;
			jaywalkTemp["type"] = "무단횡단";
			jaywalkTemp["value"] = jaywalkVolume;

			DTPedestrians.push(personTemp);
			DTPedestrians.push(totalTemp);
			DTPedestrians.push(jaywalkTemp);
		});
		setData(DTPedestrians);
		setLoading(false);
	};
	var config = {
		data: Data,
		xField: "date",
		yField: "value",
		yAxis: {
			label: {
				formatter: function formatter(v) {
					return v.concat("명").replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
						return "".concat(s, ",");
					});
				},
			},
		},
		seriesField: "type",
		color: function color(_ref) {
			var type = _ref.type;
			return type === "총 보행자"
				? "#F4664A"
				: type === "보행자"
				? "#30BF78"
				: "#FAAD14";
		},
		lineStyle: function lineStyle(_ref2) {
			var type = _ref2.type;
			if (type === "총 보행자") {
				return {
					lineDash: [4, 4],
					opacity: 1,
				};
			}
			return { opacity: 0.5 };
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
export default Pedestrians;
