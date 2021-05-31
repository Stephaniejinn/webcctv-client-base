import React from "react";
import { Layout, Typography, Divider } from "antd";

import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import SignupForm from "../../organisms/accountForm/SignupForm";

import "./style.less";

const SignupPage = (props) => {
	const { setLoggedIn, isMaster } = props;
	const { Content } = Layout;
	const { Title } = Typography;
	return (
		<div className="account-page">
			{isMaster ? (
				<Layout style={{ minHeight: "100vh" }}>
					<Sider />
					<Layout className="site-layout">
						<Header setLoggedIn={setLoggedIn} isMaster={true} />
						<Content style={{ margin: "0 16px" }}>
							<Breadcrumb
								pageHierarchy={["대시보드", "개인정보", "계정 발급"]}
							/>
							<Title level={3} style={{ minWidth: 120 }}>
								계정 발급
							</Title>
							<Divider />
							<SignupForm />
						</Content>
					</Layout>
				</Layout>
			) : (
				<>
					{window.confirm("이 페이지 접근 권한이 없습니다")
						? window.history.back()
						: window.history.back()}
				</>
			)}
		</div>
	);
};

export default SignupPage;
