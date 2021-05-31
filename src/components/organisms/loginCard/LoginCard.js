import React from "react";
import { Form, Input, Button, message, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

const LoginCard = (props) => {
	const { baseURL, setLoggedIn } = props;
	const { Title } = Typography;

	const login = (values) => {
		const { username, password } = values;
		axios
			.post(
				`${baseURL}/auth/tokens`,
				JSON.stringify({
					username,
					password,
				}),
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => {
				const { jwt } = res.data;
				window.localStorage.setItem("token", jwt);
				window.localStorage.setItem("username", username);
				getUserInfo();
			})
			.catch((err) => {
				console.log(err);
				if (err.response) {
					message.error("로그인 실패");
				} else {
					message.error("Network Error");
				}
			});
	};
	const getUserInfo = () => {
		axios
			.get(`${baseURL}/users/${localStorage.getItem("username")}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				window.localStorage.setItem("affiliate", res.data.affiliate);
				setLoggedIn(true);
			})
			.catch((err) => {
				console.log("login", err.response);
			});
	};
	return (
		<Card>
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{
					remember: true,
				}}
				onFinish={login}
				size="large"
			>
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
							message: "아이디를 입력하세요",
						},
					]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="아이디"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: "비밀번호를 입력하세요",
						},
					]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="비밀번호"
						autoComplete="true"
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						로그인
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

const mapStateToProps = (state) => {
	return {
		baseURL: state.baseURL.baseURL,
	};
};

export default connect(mapStateToProps)(LoginCard);
