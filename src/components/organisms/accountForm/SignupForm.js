import React, { useState } from "react";
import { Form, Input, Checkbox, Button, Modal, Alert, message } from "antd";
import { BankOutlined } from "@ant-design/icons";
import useClippy from "use-clippy";
import { connect } from "react-redux";
import axios from "axios";

import Cascader from "../../atoms/cascader/Cascader";
import AccountDescriptionForm from "../../atoms/accountDescription/AccountDescriptionFrom";

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

const SignupForm = (props) => {
	const { baseURL } = props;
	const [form] = Form.useForm();
	const [modalVisible, setModalVisible] = useState(false);
	const [clipboard, setClipboard] = useClippy();
	const [signupInfo, setSignupInfo] = useState({
		username: "",
		password: "",
		affiliate: "",
		permission: "",
	});

	const handleModalClose = () => {
		setModalVisible(false);
	};
	const handleCopy = () => {
		setClipboard(
			`아이디: ${signupInfo.username} 비밀번호: ${signupInfo.password}`
		);
		message.success("클립보드에 복사되었습니다");
	};
	const signUp = (values) => {
		const { signupUsername, password, affiliate } = values;
		const permission = "[]";
		axios
			.post(
				`${baseURL}/users`,
				JSON.stringify({
					username: signupUsername,
					password,
					affiliate,
					permission,
				}),
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				if (res.data.success) {
					setModalVisible(true);
					setSignupInfo({
						username: res.data.username,
						password,
						affiliate,
						permission,
					});
				}
			})
			.catch((err) => {
				if (err.response.status === 409) {
					message.error("이미 존재하는 아이디입니다");
				}
				console.log(err.response);
			});
	};

	return (
		<Form
			labelCol={formItemLayout.labelCol}
			wrapperCol={formItemLayout.wrapperCol}
			form={form}
			name="register"
			onFinish={signUp}
			scrollToFirstError
			size="large"
		>
			<Form.Item
				name="signupUsername"
				label="아이디"
				rules={[
					{
						required: true,
						message: "발급 대상의 계정이름을 입력하세요.",
					},
					{
						min: 6,
						message: "최소 6자리 이상",
					},
				]}
			>
				<Input prefix={<BankOutlined className="site-form-item-icon" />} />
			</Form.Item>
			<Form.Item
				name="password"
				label="비밀번호"
				rules={[
					{
						type: "string",
						required: true,
						message: "발급 대상의 초기 비밀번호를 입력하세요",
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
				label="비밀번호 재확인"
				dependencies={["password"]}
				hasFeedback
				rules={[
					{
						required: true,
						message: "발급 대상의 초기 비밀번호를 다시 한번 입력하세요",
					},
					({ getFieldValue }) => ({
						validator(rule, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject("비밀번호 확인이 올바르지 않습니다");
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				name="affiliate"
				label="소속"
				rules={[
					{
						required: true,
						message: "발급 대상의 소속을 입력하세요.",
					},
				]}
			>
				<Input prefix={<BankOutlined className="site-form-item-icon" />} />
			</Form.Item>
			{/* <Form.Item
				name="permission"
				label="권한"
				rules={[
					{
						type: "array",
						// required: true,
						required: false,
						message: "발급 대상의 권한을 선택하세요.",
					},
				]}
			>
				<Cascader isDisabled={true} placeholdertxt="권한을 선택하세요" />
			</Form.Item> */}
			<Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
				<Button type="primary" htmlType="submit" size="large">
					발급
				</Button>
				<Modal
					title={<Alert message="발급성공" type="success" showIcon />}
					visible={modalVisible}
					closable={false}
					footer={
						<>
							<Button key="copy" type="default" onClick={handleCopy}>
								복사
							</Button>
							<Button key="confirm" type="primary" onClick={handleModalClose}>
								확인
							</Button>
						</>
					}
					onCancel={handleModalClose}
				>
					<AccountDescriptionForm
						username={signupInfo.username}
						password={signupInfo.password}
						affiliation={signupInfo.affiliate}
						// permission={signupInfo.permission}
					/>
				</Modal>
			</Form.Item>
		</Form>
	);
};
const mapStateToProps = (state) => {
	return {
		baseURL: state.baseURL.baseURL,
	};
};

export default connect(mapStateToProps)(SignupForm);
