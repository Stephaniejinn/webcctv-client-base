import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";

import "../style.less";

const WTSecondTable = (props) => {
	const { currentLaneNum, trafficTotalData } = props;

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
	var TotalData = [];

	useEffect(() => {
		if (currentLaneNum === 0) {
			setLoading(true);
			setData([]);
			parseData();
		}
	}, [trafficTotalData]);

	const columns = [
		{
			title: "시간",
			dataIndex: "time",
			key: "time",
		},
		{
			title: "전체",
			dataIndex: "Total",
			key: "Total",
			children: [
				{
					title: "주야율",
					dataIndex: "totalDayNightRatio",
					key: "totalNightRatio",
				},
				{
					title: "PHF",
					dataIndex: "totalPHF",
					key: "totalPHF",
				},
				{
					title: "첨두유율",
					dataIndex: "totalPeekHourCnt",
					key: "totalPeekHourCnt",
				},
				{
					title: "집중률",
					dataIndex: "totalVehiclePeakHourConcentrationRatio",
					key: "totalVehiclePeakHourConcentrationRatio",
				},
			],
		},
		{
			title: "차종별 주야율",
			dataIndex: "TypeDayNightRatio",
			key: "TypeNightRatio",
			children: [
				{
					title: "승용차",
					dataIndex: "carDayNightRatio",
					key: "carNightRatio",
				},
				{
					title: "버스",
					dataIndex: "busDayNightRatio",
					key: "busNightRatio",
				},
				{
					title: "화물차",
					dataIndex: "truckDayNightRatio",
					key: "truckNightRatio",
				},
				{
					title: "이륜차",
					dataIndex: "motorDayNightRatio",
					key: "motorNightRatio",
				},
			],
		},
	];
	const parseData = () => {
		trafficTotalData.forEach((eachData, index) => {
			const {
				weekOption,
				totalVehicleDayNightRatio,
				totalVehiclePeakHourFactor,
				totalVehiclePeakHourConcentrationRatio,
				totalVehiclePeakHourFlowRate,
				carDayNightRatio,
				mBusDayNightRatio,
				mTruckDayNightRatio,
				motorDayNightRatio,
			} = eachData;
			let dataTemp = {};

			dataTemp["key"] = index + 1;
			dataTemp["time"] = WeekKey[weekOption];
			dataTemp["totalDayNightRatio"] = totalVehicleDayNightRatio;
			dataTemp["totalPHF"] = totalVehiclePeakHourFactor;
			dataTemp["totalPeekHourCnt"] = totalVehiclePeakHourFlowRate;
			dataTemp[
				"totalVehiclePeakHourConcentrationRatio"
			] = totalVehiclePeakHourConcentrationRatio;

			dataTemp["carDayNightRatio"] = carDayNightRatio;
			dataTemp["busDayNightRatio"] = mBusDayNightRatio;
			dataTemp["truckDayNightRatio"] = mTruckDayNightRatio;
			dataTemp["motorDayNightRatio"] = motorDayNightRatio;

			TotalData.push(dataTemp);
		});

		setData(TotalData);
		setLoading(false);
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
				<Table columns={columns} dataSource={Data} size="small" bordered />
			)}
		</>
	);
};
export default WTSecondTable;
