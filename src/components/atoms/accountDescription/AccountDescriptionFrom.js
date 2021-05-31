import React from "react";
import { Descriptions } from "antd";

const AccountDescriptionForm = ({ username, password, affiliation }) => {
	return (
		<Descriptions title="사용자 정보" column={2}>
			<Descriptions.Item label="소속">{affiliation}</Descriptions.Item>
			<Descriptions.Item label="권한"></Descriptions.Item>
			<Descriptions.Item label="아이디">{username}</Descriptions.Item>
			<Descriptions.Item label="초기 비밀번호">{password}</Descriptions.Item>
		</Descriptions>
	);
};
export default AccountDescriptionForm;
