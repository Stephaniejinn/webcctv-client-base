import React, { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import moment from "moment";
import "moment-timezone";
import { Layout, Typography, Divider } from "antd";

import logo from "../../../assets/logo/originalLogo.png";
import Avatar from "../../molecules/avatar/Avatar";

import "./style.less";

const { Header } = Layout;
const { Text } = Typography;

const MyHeader = (props) => {
	const { page, setLoggedIn, isMaster } = props;
	const [currentTime, setCurrentTime] = useState(
		moment(new Date()).format("YYYY년 MM월 DD일 HH:mm:ss")
	);

	useEffect(() => {
		const intv = setInterval(() => {
			setCurrentTime(moment(new Date()).format("YYYY년 MM월 DD일 HH:mm:ss"));
		}, 1000);

		return () => {
			clearInterval(intv);
		};
	}, []);

	return (
		<Header className="site-layout-background" style={{ padding: 0 }}>
			{page === "SIGNIN" ? (
				<div className="login-header">
					<img src={logo} className="logo" alt="logo" />
					<Divider type="vertical" />
					<Text strong type="secondary">
						대시보드
					</Text>
				</div>
			) : (
				<div className="header-text-avatar">
					<Text style={{ marginRight: 10 }}>{currentTime}</Text>
					<Avatar setLoggedIn={setLoggedIn} isMaster={isMaster} />
				</div>
			)}
		</Header>
	);
};

export default MyHeader;
