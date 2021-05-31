import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";
import { Spin } from "antd";
import moment from "moment";

const WMFlowRate = (props) => {
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

	useEffect(() => {
		if (activeVisualKey === "8") {
			setLoading(true);
			setData([]);

			parseTotalData();
		}
	}, [trafficTotalData, activeVisualKey]);

	const parseTotalData = () => {
		var TotalData = [];
		trafficTotalData.slice(3).forEach((TrafficData) => {
			const {
				weekOption,
				recordDate,
				totalVehiclePeakHourFlowRate,
			} = TrafficData;

			const temp = {};
			if (weekOption) {
				temp["type"] = WeekKey[weekOption];
			}
			if (recordDate) {
				temp["type"] = moment(recordDate).format("MM-DD");
			}
			temp["value"] = totalVehiclePeakHourFlowRate;

			TotalData.push(temp);
		});
		setData(TotalData);
		setLoading(false);
	};

	var config = {
		data: Data,
		xField: "type",
		yField: "value",
		label: {
			position: "middle",
			style: {
				fill: "#FFFFFF",
				opacity: 0.6,
			},
		},
		meta: {
			type: { alias: "요일" },
			value: { alias: "첨두유율" },
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
export default WMFlowRate;
