import React, { useEffect } from "react";
import { Tabs } from "antd";
import DayCntLineChart from "../../charts/lineChart/DTCnt";
import DayPCULineChart from "../../charts/lineChart/DTPCU";
import DayVehicleRatio from "../../charts/lineChart/DTVehicleRatio";
import DayAvgSpeed from "../../charts/lineChart/DTAvgSpeed";
import DayOverSpeed from "../../charts/lineChart/DTOverSpeed";
import Peak15 from "../../charts/statisticText/Peak15";
import PeakHourFlowRate from "../../charts/statisticText/PeakHourFlowRate";
import DayPHF from "../../charts/statisticText/PHF";
import DayConcentrationRatio from "../../charts/liquidChart/PeakRatio";
import BidirectionalBar from "../../charts/bidirectionalBar/DayNight";
import PedestriansDashLine from "../../charts/dashLineChart/DayPedestrians";

import WeekCnt from "../../charts/lineChart/WTCnt";
import WeekPCU from "../../charts/lineChart/WTPCU";
import WeekAvgSpeed from "../../charts/lineChart/WTAvgSpeed";
import WeekOverSpeed from "../../charts/lineChart/WTOverSpeed";
import WeekVehicleRatio from "../../charts/barChart/WTVehicleRatio";
import WeekPeakTime from "../../charts/lineChart/WeekPeakTime";

import WeekMonthFlowRate from "../../charts/barChart/WMFlowRate";
import WeekMonthPHF from "../../charts/barChart/WTPHF";
import WeekMonthConcentrationRatio from "../../charts/barChart/WTConcentrationRatio";

import MonthCnt from "../../charts/lineChart/MTCnt";
import MonthPCU from "../../charts/lineChart/MTPCU";
import MonthVehicleRatio from "../../charts/lineChart/MTVehicleRatio";
import MonthAvgSpeed from "../../charts/lineChart/MTAvgSpeed";
import MonthOverSpeed from "../../charts/lineChart/MTOverSpeed";
import MonthPeakTime from "../../charts/lineChart/MonthPeakTime";

import "./style.less";

const TimeDataVisualization = (props) => {
	const {
		period,
		currentLaneNum,
		activeVisualKey,
		setActiveVisualKey,
		trafficTotalData,
	} = props;

	const { TabPane } = Tabs;

	const callback = (key) => {
		setActiveVisualKey(key);
	};
	useEffect(() => {
		if (parseInt(currentLaneNum) !== 0) {
			if (
				activeVisualKey === "6" ||
				activeVisualKey === "7" ||
				activeVisualKey === "8" ||
				activeVisualKey === "9" ||
				activeVisualKey === "10"
			) {
				setActiveVisualKey("1");
			}
		}
	}, [currentLaneNum]);
	return (
		<Tabs
			defaultActiveKey="1"
			activeKey={activeVisualKey}
			onChange={callback}
			tabPosition="right"
		>
			<TabPane tab="교통량" key="1">
				{period === "DAY" ? (
					<DayCntLineChart
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : period === "WEEK" ? (
					<WeekCnt
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : (
					<MonthCnt
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				)}
			</TabPane>
			<TabPane tab="PCU" key="2">
				{period === "DAY" ? (
					<DayPCULineChart
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : period === "WEEK" ? (
					<WeekPCU
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : (
					<MonthPCU
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				)}
			</TabPane>
			<TabPane tab="차종비율" key="3">
				{period === "DAY" ? (
					<DayVehicleRatio
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : period === "WEEK" ? (
					<WeekVehicleRatio
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : (
					<MonthVehicleRatio
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				)}
			</TabPane>
			<TabPane tab="평균속도" key="4">
				{period === "DAY" ? (
					<DayAvgSpeed
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : period === "WEEK" ? (
					<WeekAvgSpeed
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : (
					<MonthAvgSpeed
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				)}
			</TabPane>
			<TabPane tab="과속차량" key="5">
				{period === "DAY" ? (
					<DayOverSpeed
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : period === "WEEK" ? (
					<WeekOverSpeed
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : (
					<MonthOverSpeed
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				)}
			</TabPane>
			{parseInt(currentLaneNum) === 0 ? (
				<>
					<TabPane tab="주야율" key="6">
						<BidirectionalBar
							activeVisualKey={activeVisualKey}
							trafficTotalData={trafficTotalData}
						/>
					</TabPane>
					<TabPane tab="첨두시간" key="7">
						{period === "DAY" ? (
							<Peak15
								trafficTotalData={trafficTotalData}
								activeVisualKey={activeVisualKey}
							/>
						) : period === "WEEK" ? (
							<WeekPeakTime
								trafficTotalData={trafficTotalData}
								activeVisualKey={activeVisualKey}
							/>
						) : (
							<MonthPeakTime
								trafficTotalData={trafficTotalData}
								activeVisualKey={activeVisualKey}
							/>
						)}
					</TabPane>
					<TabPane tab="첨두유율" key="8">
						{period === "DAY" ? (
							<PeakHourFlowRate
								trafficTotalData={trafficTotalData}
								activeVisualKey={activeVisualKey}
							/>
						) : (
							<WeekMonthFlowRate
								trafficTotalData={trafficTotalData}
								activeVisualKey={activeVisualKey}
							/>
						)}
					</TabPane>
					<TabPane tab="PHF" key="9">
						{period === "DAY" ? (
							<DayPHF
								trafficTotalData={trafficTotalData}
								activeVisualKey={activeVisualKey}
							/>
						) : (
							<WeekMonthPHF
								trafficTotalData={trafficTotalData}
								activeVisualKey={activeVisualKey}
							/>
						)}
					</TabPane>
					<TabPane tab="집중률" key="10">
						{period === "DAY" ? (
							<DayConcentrationRatio
								trafficTotalData={trafficTotalData}
								activeVisualKey={activeVisualKey}
							/>
						) : (
							<WeekMonthConcentrationRatio
								trafficTotalData={trafficTotalData}
								activeVisualKey={activeVisualKey}
							/>
						)}
					</TabPane>
					<TabPane tab="무단횡단" key="11">
						{period === "DAY" ? (
							<PedestriansDashLine
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						) : (
							<WeekMonthPedstrians
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						)}
					</TabPane>
				</>
			) : null}
		</Tabs>
	);
};

export default TimeDataVisualization;
