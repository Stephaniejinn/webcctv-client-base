import React from "react";
import { Form, Input, message, Button } from "antd";
import { BankOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { connect } from "react-redux";
// import Cascader from "../../atoms/cascader/Cascader";

import "./style.less";

const formItemLayout = {
	labelCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 8,
		},
	},
	wrapperCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 16,
		},
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

const PasswordForm = (props) => {
	const { setLoggedIn, baseURL } = props;
	const [form] = Form.useForm();

	const changePassword = (values) => {
		const { oldPassword, newPassword } = values;
		axios
			.put(
				`${baseURL}/users/${localStorage.getItem("username")}/password`,
				JSON.stringify({
					oldPassword,
					newPassword,
				}),
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => {
				message.success("비밀번호 변경 성공");
				setLoggedIn(false);
				// redirect
			})
			.catch((err) => {
				console.log(err.response);
				if (err.response.status === 401) {
					// message.error(err.response.data.message);
					message.error("입력된 기존 비밀번호가 틀렸습니다");
				} else if (err.response.status === 400) {
					message.error("존재하지 않는 아이디입니다");
				} else {
					message.error("Unknown error");
				}
			});
	};

	return (
		<Form
			{...formItemLayout}
			form={form}
			name="register"
			onFinish={changePassword}
			scrollToFirstError
			size="large"
		>
			<Form.Item
				name="username"
				label="계정"
				initialValue={localStorage.getItem("username")}
			>
				<Input
					disabled
					prefix={<UserOutlined className="site-form-item-icon" />}
				/>
			</Form.Item>
			<Form.Item
				name="affiliation"
				label="소속"
				initialValue={localStorage.getItem("affiliate")}
			>
				<Input
					disabled
					prefix={<BankOutlined className="site-form-item-icon" />}
				/>
			</Form.Item>
			{/* <Form.Item name="permission" label="권한" initialValue="permission">
				<Cascader />
			</Form.Item> */}
			<Form.Item
				name="oldPassword"
				label="현재 비밀번호"
				rules={[
					{
						required: true,
						message: "현재 비밀번호를 입력하세요",
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				name="newPassword"
				label="새 비밀번호"
				rules={[
					{
						type: "string",
						required: true,
						message: "새 비밀번호를 입력하세요",
					},
					{
						min: 8,
						message: "최소 8자리 이상",
					},
					{
						validator: (rule, value) => {
							const oNumber = "0123456789";
							const oLetter = "abcdefghijklmnopqrstuvwxyz";
							const oLetterCap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
							const oSpecial = "-#@!$%^&* ()_+|~=`{}[]:;'<>?,./\"";
							const oTher = oNumber + oLetter + oLetterCap + oSpecial;
							let total = 0;
							const oSpeArr = value.split("");

							const oNumberItem = oSpeArr.find(
								(item) => oNumber.indexOf(item) !== -1
							);
							const oLetterItem = oSpeArr.find(
								(item) => oLetter.indexOf(item) !== -1
							);
							const oLetterCapItem = oSpeArr.find(
								(item) => oLetterCap.indexOf(item) !== -1
							);
							const oSpeItem = oSpeArr.find(
								(item) => oSpecial.indexOf(item) !== -1
							);
							const oTherItem = oSpeArr.find(
								(item) => oTher.indexOf(item) === -1
							);
							if (oTherItem !== undefined) {
								return Promise.reject(
									"영문 대문자, 소문자, 숫자, 특수문자(-#@!$%^&* ()_+|~=`{}[]:;'<>?,./\") 최소 한개 이상"
								);
							}
							if (oNumberItem !== undefined) {
								total += 1;
							} else {
								return Promise.reject("숫자 최소 한개 이상");
							}
							if (oLetterItem !== undefined) {
								total += 1;
							} else {
								return Promise.reject("영문 소문자 최소 한개 이상");
							}
							if (oSpeItem !== undefined) {
								total += 1;
							} else {
								return Promise.reject(
									"특수문자(-#@!$%^&* ()_+|~=`{}[]:;'<>?,./\") 최소 한개 이상"
								);
							}
							if (oLetterCapItem !== undefined) {
								total += 1;
							} else {
								return Promise.reject("영문 대문자 최소 한개 이상");
							}
							if (total === 4) {
								return Promise.resolve();
							}
							return Promise.reject(
								"영문 대문자, 소문자, 숫자, 특수문자(-#@!$%^&* ()_+|~=`{}[]:;'<>?,./\") 최소 한개 이상"
							);
						},
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				name="confirm"
				label="새 비밀번호 확인"
				dependencies={["password"]}
				hasFeedback
				rules={[
					{
						required: true,
						message: "새 비밀번호를 다시 한번 입력하세요",
					},
					({ getFieldValue }) => ({
						validator(rule, value) {
							if (
								!value ||
								(getFieldValue("newPassword") === value &&
									getFieldValue("oldPassword") !== value)
							) {
								return Promise.resolve();
							}

							if (getFieldValue("newPassword") !== value) {
								return Promise.reject("비밀번호 확인이 올바르지 않습니다");
							}

							return Promise.reject(
								"현재 비밀번호와 다른 비밀번호를 입력해주세요"
							);
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item {...tailFormItemLayout}>
				<Button type="primary" htmlType="submit">
					확인
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapStateToProps = (state) => {
	return {
		baseURL: state.baseURL.baseURL,
	};
};

export default connect(mapStateToProps)(PasswordForm);
