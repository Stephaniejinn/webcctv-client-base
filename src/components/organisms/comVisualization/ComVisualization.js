import React from "react";
import { Tabs, Divider } from "antd";

import ComVisualHalf from "../../molecules/comVisualHalf/ComVisualHalf";
import ComVisualOne from "../../molecules/comVisualOne/ComVisualOne";
import Pie from "../../charts/pieChart";
import Funnel from "../../charts/funnelChart";
import Bar from "../../charts/barChart/LaneVehicleCnt";

import "./style.less";

const ComVisualization = ({ period }) => {
	const { TabPane } = Tabs;
	const PieChart = <Pie />;
	const FunnelChart = <Funnel />;
	const BarChart = <Bar />;

	const callback = (key) => {
		// console.log(key);
	};
	return (
		<Tabs defaultActiveKey="1" onChange={callback} tabPosition="left">
			<TabPane tab="교통량" key="1">
				<div className="tab-pane-content-body">
					<ComVisualOne chart={BarChart} period={period} />
				</div>
			</TabPane>
			<TabPane tab="PCU" key="2">
				<div className="tab-pane-content-body">
					<ComVisualOne chart={BarChart} period={period} />
				</div>
			</TabPane>
			<TabPane tab="평균속도" key="4">
				<div className="tab-pane-content-body">
					<ComVisualOne chart={BarChart} period={period} />
				</div>
			</TabPane>
			<TabPane tab="과속차량" key="5">
				<div className="tab-pane-content-body">
					<ComVisualOne chart={BarChart} period={period} />
				</div>
			</TabPane>
			<TabPane tab="PHF" key="6">
				<div className="tab-pane-content-body">
					<ComVisualOne chart={BarChart} period={period} />
				</div>
			</TabPane>
			<TabPane tab="주야율" key="7">
				<div className="tab-pane-content-body">
					<ComVisualHalf chart={FunnelChart} period={period} />
					<Divider type="vertical" />
					<ComVisualHalf chart={FunnelChart} period={period} />
				</div>
			</TabPane>
			<TabPane tab="ADT" key="8">
				Content
			</TabPane>
			<TabPane tab="무단횡단" key="11">
				<div className="tab-pane-content-body">
					<ComVisualHalf chart={PieChart} period={period} />
					<Divider type="vertical" />
					<ComVisualHalf chart={PieChart} period={period} />
				</div>
			</TabPane>
		</Tabs>
	);
};

export default ComVisualization;
