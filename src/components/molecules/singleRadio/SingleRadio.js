import React, { useState } from "react";
import { Radio } from "antd";

// import "./style.less";

const SingleRadio = (props) => {
	const { page, multiSelected } = props;
	const [value, setValue] = useState(1);
	const onChange = (e) => {
		setValue(e.target.value);
	};
	return (
		<>
			<Radio.Group onChange={onChange} value={value} defaultValue={1}>
				<Radio value={1} disabled={multiSelected}>
					전체
				</Radio>
				<Radio value={2} disabled={multiSelected}>
					평일
				</Radio>
				<Radio value={3} disabled={multiSelected}>
					주말
				</Radio>
			</Radio.Group>
		</>
	);
};

export default SingleRadio;
