import React from "react";
import { Tabs } from "antd";

import VehicleVolume from "../../charts/barChart/LaneVehicleCnt";
import PCUBar from "../../charts/barChart/LanePCU";
import VehicleRatio from "../../charts/barChart/LaneVehicleRatio";
import AvgSpeed from "../../charts/lineChart/LaneAvgSpeed";
import OverSpeedVolume from "../../charts/barChart/LaneOverSpeedCnt";

import "./style.less";

const LaneDataVisualization = (props) => {
	const { activeVisualKey, setActiveVisualKey, trafficTotalData } = props;

	const { TabPane } = Tabs;

	const callback = (key) => {
		setActiveVisualKey(key);
	};

	return (
		<Tabs
			defaultActiveKey="1"
			activeKey={activeVisualKey}
			onChange={callback}
			tabPosition="right"
		>
			<TabPane tab="교통량" key="1">
				<VehicleVolume
					activeVisualKey={activeVisualKey}
					trafficTotalData={trafficTotalData}
				/>
			</TabPane>
			<TabPane tab="PCU" key="2">
				<PCUBar
					activeVisualKey={activeVisualKey}
					trafficTotalData={trafficTotalData}
				/>
			</TabPane>
			<TabPane tab="차종비율" key="3">
				<VehicleRatio
					activeVisualKey={activeVisualKey}
					trafficTotalData={trafficTotalData}
				/>
			</TabPane>
			<TabPane tab="평균속도" key="4">
				<AvgSpeed
					activeVisualKey={activeVisualKey}
					trafficTotalData={trafficTotalData}
				/>
			</TabPane>
			<TabPane tab="과속차량" key="5">
				<OverSpeedVolume
					activeVisualKey={activeVisualKey}
					trafficTotalData={trafficTotalData}
				/>
			</TabPane>
		</Tabs>
	);
};

export default LaneDataVisualization;
