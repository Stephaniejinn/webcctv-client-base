import React, { useEffect, useState } from "react";
import {
	Table,
	Spin,
	Button,
	Modal,
	Descriptions,
	Typography,
	message,
} from "antd";
import moment from "moment";

import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import Video from "../../molecules/video/Video";
import "./style.less";

const OverSpeedTable = (props) => {
	const {
		startDate,
		endTime,
		cameraCode,
		baseURL,
		camera,
		overSpeedVideoURL,
		setLoggedIn,
		isRefresh,
		setRefresh,
	} = props;
	const { Text } = Typography;

	const [Data, setData] = useState([]);
	const [isLoadingData, setLoadingData] = useState(true);
	const [isEmptyData, setEmptyData] = useState(false);
	const [isImgModalVisible, setImgModalVisible] = useState(false);
	const [isVideoModalVisible, setVideoModalVisible] = useState(false);
	const [shownKey, setShownKey] = useState("");
	const [isVideoSource, setVideoSource] = useState(true);
	var TotalData = [];

	useEffect(() => {
		if (isRefresh) {
			setLoadingData(true);
			setEmptyData(false);
			setData([]);
			axiosData();
		}
	}, [startDate, endTime, cameraCode, isRefresh]);

	const handleClick = () => {
		setImgModalVisible(true);
		setVideoSource(true);
	};

	const columns = [
		{
			title: "시간",
			dataIndex: "time",
			key: "time",
		},
		{
			title: "차량번호",
			dataIndex: "licenseNumber",
			key: "licenseNumber",
		},
		{
			title: "위반속도",
			dataIndex: "speed",
			key: "speed",
		},
		{
			title: "차선",
			dataIndex: "laneNumber",
			key: "laneNumber",
		},
		{
			title: "차종",
			dataIndex: "vehicleType",
			key: "vehicleType",
		},
		{
			title: "이미지",
			dataIndex: "imageLink",
			key: "imageLink",
			render: (imgInfo) => (
				<>
					<Button type="link" size="small" onClick={handleClick}>
						이미지 보기
					</Button>
					{shownKey === imgInfo[0] % 10 && (
						<>
							<Modal
								title="과속차량 이미지"
								centered
								maskStyle={{ backgroundColor: "transparent" }}
								bodyStyle={{ width: 630 }}
								style={{ width: 630 }}
								visible={isImgModalVisible}
								onOk={() => setImgModalVisible(false)}
								onCancel={() => setImgModalVisible(false)}
								footer={[
									<Button
										key="submit"
										type="primary"
										onClick={() => setImgModalVisible(false)}
									>
										확인
									</Button>,
								]}
							>
								<Descriptions bordered size="small">
									<Descriptions.Item label="위반차량" span={2}>
										{imgInfo[5]}
									</Descriptions.Item>
									<Descriptions.Item label="과속영상" span={1}>
										<Button
											type="primary"
											ghost
											onClick={() => setVideoModalVisible(true)}
										>
											영상 보기
										</Button>
										<Modal
											title="과속차량 영상"
											visible={isVideoModalVisible}
											onOk={() => setVideoModalVisible(false)}
											onCancel={() => setVideoModalVisible(false)}
											footer={[
												<Button
													key="submit"
													type="primary"
													onClick={() => setVideoModalVisible(false)}
												>
													확인
												</Button>,
											]}
										>
											{isVideoSource ? (
												<Video
													source={`${overSpeedVideoURL}/${cameraCode}/clip?record_time=${imgInfo[6]}`}
													showControls={true}
													setVideoSource={setVideoSource}
												/>
											) : (
												<div
													style={{
														marginTop: 20,
														marginBottom: 20,
														textAlign: "center",
														paddingTop: 30,
														paddingBottom: 30,
													}}
												>
													<Text>해당 과속차량 영상이 없습니다</Text>
												</div>
											)}
										</Modal>
									</Descriptions.Item>
									<Descriptions.Item label="시간" span={2}>
										{imgInfo[2]}
									</Descriptions.Item>
									<Descriptions.Item label="위반속도">
										{imgInfo[3]}km/h
									</Descriptions.Item>
									<Descriptions.Item label="위치" span={2}>
										{camera}
									</Descriptions.Item>
									<Descriptions.Item label="위반차로">
										{imgInfo[4]}
									</Descriptions.Item>
								</Descriptions>
								{imgInfo[1] ? (
									<img
										style={{ marginTop: 15 }}
										alt="과속차량 이미지"
										src={imgInfo[1]}
									/>
								) : (
									<div
										style={{
											marginTop: 20,
											marginBottom: 20,
											textAlign: "center",
											paddingTop: 30,
											paddingBottom: 30,
										}}
									>
										<Text>해당 과속차량 이미지가 없습니다</Text>
									</div>
								)}
							</Modal>
						</>
					)}
				</>
			),
		},
	];

	const axiosData = () => {
		axios
			.get(
				`${baseURL}/violations/speeding/records?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&limit=0&offset=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				if (res.data.length !== 0) {
					res.data.forEach((eachData, index) => {
						const {
							recordTime,
							vehicleType,
							laneNumber,
							licenseNumber,
							speed,
							imageLink,
						} = eachData;
						let dataTemp = {};
						dataTemp["key"] = index.toString();
						if (startDate !== endTime) {
							dataTemp["time"] = moment(recordTime).format(
								"YYYY년 MM월 DD일 HH:mm:ss"
							);
						} else {
							dataTemp["time"] = moment(recordTime).format("HH:mm:ss");
						}
						dataTemp["vehicleType"] = vehicleType;
						dataTemp["licenseNumber"] = licenseNumber;
						dataTemp["speed"] = `${speed} km/h`;
						dataTemp["laneNumber"] = `${laneNumber} 차선`;
						dataTemp["imageLink"] = [
							index.toString(),
							imageLink,
							moment(recordTime).format("YYYY년 MM월 DD일 HH시 mm분 ss초"),
							speed,
							dataTemp["laneNumber"],
							licenseNumber,
							recordTime,
						];
						TotalData.push(dataTemp);
					});
					setData(TotalData);
					setLoadingData(false);
					setEmptyData(false);
					setRefresh(false);
				} else {
					setEmptyData(true);
				}
			})
			.catch((err) => {
				if (err.response.status === 400) {
					message.warning("해당 기간 시간 별 데이터가 없습니다");
				} else if (err.response.status === 401) {
					setLoggedIn(false);
				}
				setEmptyData(true);
			});
	};

	return (
		<>
			{isEmptyData ? (
				<div className="empty-data-text">
					<Text strong type="danger">
						해당 과속 데이터가 없습니다
					</Text>
				</div>
			) : isLoadingData ? (
				<div
					style={{
						marginTop: 20,
						marginBottom: 20,
						textAlign: "center",
						paddingTop: 30,
						paddingBottom: 30,
					}}
				>
					<Spin size="large" />
				</div>
			) : (
				<Table
					columns={columns}
					dataSource={Data}
					pagination={{ pageSize: 10, showSizeChanger: false }}
					onRow={(record, rowIndex) => {
						return {
							onClick: (event) => {
								setShownKey(rowIndex);
							}, // click row
						};
					}}
					size="small"
					bordered
				/>
			)}
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
		baseURL: state.baseURL.baseURL,
		camera: state.location.camera,
		overSpeedVideoURL: state.baseURL.overSpeedVideoURL,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getLocationCodeInfo: () => {
			dispatch(actions.getLocationCode());
		},
		getBaseURL: () => {
			dispatch(actions.getURL());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(OverSpeedTable);
