import React from "react";
import { Layout, Typography } from "antd";

import Header from "../../organisms/header";
import LoginCard from "../../organisms/loginCard/LoginCard";

import "./style.less";

const LoginPage = (props) => {
	const { setLoggedIn } = props;
	const { Content } = Layout;
	const { Title, Text } = Typography;
	return (
		<div className="login-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Layout className="site-layout">
					<Header page="SIGNIN" />
					<Content style={{ margin: "0" }}>
						<div className="site-layout-background" style={{ minHeight: 720 }}>
							<Title>AI 도로교통현황 대시보드</Title>
							<Text type="secondary">
								주식회사 글로벌브릿지 인공지능 대시보드
							</Text>
							<LoginCard setLoggedIn={setLoggedIn} />
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default LoginPage;
