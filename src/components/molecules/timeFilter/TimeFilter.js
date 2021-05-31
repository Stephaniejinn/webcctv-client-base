import React, { useState } from "react";
import { Radio, Typography } from "antd";

import "./style.less";

const TimeFilter = (props) => {
	const { value, setValue } = props;
	const { Text } = Typography;

	const onChange = (e) => {
		setValue(e.target.value);
	};
	return (
		<div className="multi-radio-body">
			<Text strong style={{ marginRight: 10, minWidth: 60 }}>
				선택사항
			</Text>
			<Radio.Group onChange={onChange} value={value}>
				<Radio value="ALL">전체</Radio>
				<Radio value="DAY">평일</Radio>
				<Radio value="END">주말</Radio>
			</Radio.Group>
		</div>
	);
};

export default TimeFilter;
