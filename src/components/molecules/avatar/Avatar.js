import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Menu, Dropdown, Typography, Divider, Avatar, Button } from "antd";
import {
	IdcardOutlined,
	UserOutlined,
	ExportOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";
import axios from "axios";

import "./style.less";

const MyAvatar = (props) => {
	const { baseURL, setLoggedIn, isMaster } = props;
	const { Text } = Typography;
	const HandleLogout = () => {
		axios
			.delete(`${baseURL}/auth/tokens`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				window.localStorage.clear();
				setLoggedIn(false);
			})
			.catch((err) => {
				setLoggedIn(false);
				window.localStorage.clear();
				console.log(err);
			});
	};
	const dropdownContent = (
		<Menu style={{ width: 190 }}>
			<Menu.Item>
				<Text type="secondary" strong style={{ marginBottom: 6 }}>
					접속 계정:{localStorage.getItem("username")}
				</Text>
				<Text type="secondary" strong>
					소속: {localStorage.getItem("affiliate")}
				</Text>
			</Menu.Item>
			<Divider />
			{isMaster && (
				<Menu.Item>
					<Link to="/signup" style={{ color: "#595c97" }}>
						<IdcardOutlined />
						계정 발급
					</Link>
				</Menu.Item>
			)}

			<Menu.Item>
				<Link to="/password" style={{ color: "#595c97" }}>
					<UserOutlined />
					비밀번호 변경
				</Link>
			</Menu.Item>
			<Divider />
			<Menu.Item>
				<Button
					size="small"
					type="link"
					style={{ color: "#595c97" }}
					onClick={HandleLogout}
				>
					<ExportOutlined />
					로그아웃
				</Button>
			</Menu.Item>
		</Menu>
	);
	return (
		<Dropdown
			overlay={dropdownContent}
			trigger={["click"]}
			placement="bottomRight"
			arrow
		>
			<Avatar
				shape="square"
				style={{
					backgroundColor: "#e4e9f0",
					verticalAlign: "middle",
				}}
				size="large"
			>
				{localStorage.getItem("username").slice(0, 1).toUpperCase()}
			</Avatar>
		</Dropdown>
	);
};
const mapStateToProps = (state) => {
	return {
		baseURL: state.baseURL.baseURL,
	};
};
export default connect(mapStateToProps)(MyAvatar);
