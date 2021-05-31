import React from "react";
import { Typography } from "antd";

import "./style.less";

const ComVisualHalf = ({ chart, period }) => {
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
		<div className="tab-pane-2">
			<Title level={2} style={{ textAlign: "center" }}>
				100명
			</Title>
			<Text type="secondary" style={{ textAlign: "center" }}>
				수인사거리1 {periodText} 총 보행자 수
			</Text>
			<div className="tab-pane-2-canvas">{chart}</div>
		</div>
	);
};

export default ComVisualHalf;
