import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import { Spin } from "antd";
import moment from "moment";

const WeekPedestrians = (props) => {
	const { activeVisualKey, trafficTotalData } = props;
	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const WeekKey = {
		SUN: "일요일",
		MON: "월요일",
		TUE: "화요일",
		WED: "수요일",
		THU: "목요일",
		FRI: "금요일",
		SAT: "토요일",
		ALL: "전체",
		DAY: "평일전체",
		END: "주말전체",
	};
	var DTPedestrians = [];

	useEffect(() => {
		if (activeVisualKey === "11") {
			setLoading(true);
			setData([]);

			parseTotalData();
		}
	}, [trafficTotalData, activeVisualKey]);

	const parseTotalData = () => {
		trafficTotalData.slice(3).forEach((pedestrianData) => {
			const {
				weekOption,
				recordDate,
				pedestrianVolume,
				jaywalkVolume,
			} = pedestrianData;

			const totalTemp = {};
			const personTemp = {};
			const jaywalkTemp = {};

			var timeTemp;
			if (weekOption) {
				timeTemp = WeekKey[weekOption];
			}
			if (recordDate) {
				timeTemp = moment(recordDate).format("MM-DD");
			}
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
export default WeekPedestrians;
