import React from "react";
import { Typography, Divider } from "antd";

import "./style.less";

const ComVisualOne = ({ chart, period }) => {
	const { Title, Text } = Typography;
	var periodText;
	if (period === "DAY") {
		periodText = "일간";
	} else if (period === "WEEK") {
		periodText = "주간";
	} else {
		periodText = "월간";
	}

	return (
		<div className="tab-pane-1">
			<div className="tab-pane-1-text-body">
				<div className="tab-pane-1-text">
					<Title level={2} style={{ textAlign: "center" }}>
						100대
					</Title>
					<Text type="secondary" style={{ textAlign: "center" }}>
						수인사거리1 {periodText} 총 통행량
					</Text>
				</div>
				<Divider type="vertical" />
				<div className="tab-pane-1-text">
					<Title level={2} style={{ textAlign: "center" }}>
						100대
					</Title>
					<Text type="secondary" style={{ textAlign: "center" }}>
						수인사거리1 {periodText} 총 통행량
					</Text>
				</div>
			</div>
			<div className="tab-pane-1-canvas">{chart}</div>
		</div>
	);
};

export default ComVisualOne;
