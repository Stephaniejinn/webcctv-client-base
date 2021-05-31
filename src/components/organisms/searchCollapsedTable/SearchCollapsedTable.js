import React, { useEffect, useState } from "react";
import { Collapse, Typography, Divider, Spin, message } from "antd";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import ExportJsonExcel from "js-export-excel";
import moment from "moment";

import axios from "axios";
import { connect } from "react-redux";

import FirstTable from "../../molecules/StatisticsTable/searchTable/SearchFirstTable";
import SecondTable from "../../molecules/StatisticsTable/searchTable/SearchSecondTable";
import SearchOverSpeedTable from "../../molecules/StatisticsTable/searchTable/SearchOverSpeed";

import "./style.less";

const SearchCollapsedTable = (props) => {
	const {
		startDate,
		endTime,
		camera,
		cameraCode,
		baseURL,
		trafficURL,
		setLoggedIn,
		camLanes,
	} = props;
	const { Panel } = Collapse;
	const { Title, Text } = Typography;

	const [errorMsg, setMsg] = useState(false);

	const [firstData, setFirstData] = useState([]);
	const [secondData, setSecondData] = useState([]);
	const [overSpeedData, setOverSpeedData] = useState([]);

	const [firstDataTotal, setFirstDataTotal] = useState([]);
	const [secondDataTotal, setSecondDataTotal] = useState([]);
	const [overSpeedDataTotal, setOverSpeedDataTotal] = useState([]);
	const [firstDataLaneTotal, setFirstDataLaneTotal] = useState({});

	const [isLoadingFirst, setLoadingFirst] = useState(true);
	const [isLoadingSecond, setLoadingSecond] = useState(true);
	const [isLoadingOverSpeed, setLoadingOverSpeed] = useState(true);
	const [isLoadingLane, setLoadingLane] = useState(true);

	const [isEmptyTrafficData, setEmptyTrafficData] = useState(false);
	const [isEmptyOverSpeedData, setEmptyOverSpeedData] = useState(false);

	var countFirstCol;
	var countSecondCol;
	var countOverSpeedCol;
	var firstDataLaneTotalTemp;
	const firstDataHeaders = [
		"시간",
		"전체 통행량",
		"전체 평균속도",
		"전체 PCU",
		"전체 과속대수",
		"승용차 통행량",
		"승용차 평균속도",
		"승용차 PCU",
		"승용차 비율",
		"승용차 과속대수",
		"버스 통행량",
		"버스 평균속도",
		"버스 PCU",
		"버스 비율",
		"버스 과속대수",
		"화물차 통행량",
		"화물차 평균속도",
		"화물차 PCU",
		"화물차 비율",
		"화물차 과속대수",
		"이륜차 통행량",
		"이륜차 평균속도",
		"이륜차 PCU",
		"이륜차 비율",
		"이륜차 과속대수",
	];
	const firstDataFilter = [
		"time",
		"totalCount",
		"totalAvgSpeed",
		"totalpcu",
		"totalOverSpeed",
		"carCount",
		"totalAvgSpeed",
		"carpcu",
		"carRatio",
		"carOverSpeed",
		"busCount",
		"busAvgSpeed",
		"buspcu",
		"busRatio",
		"busOverSpeed",
		"truckCount",
		"truckAvgSpeed",
		"truckpcu",
		"truckRatio",
		"truckOverSpeed",
		"motorCount",
		"motorAvgSpeed",
		"motorpcu",
		"motorRatio",
		"motorOverSpeed",
	];

	useEffect(() => {
		countFirstCol = 0;
		countSecondCol = 0;
		countOverSpeedCol = 0;
		setEmptyTrafficData(false);
		setEmptyOverSpeedData(false);
		setLoadingFirst(true);
		setLoadingSecond(true);
		setLoadingOverSpeed(true);
		setFirstData([]);
		setSecondData([]);
		setFirstDataTotal([]);
		setSecondDataTotal([]);
		axiosAsyncFS();
		axiosOverSpeedData();
	}, [cameraCode, startDate, endTime]);

	const downloadOverSpeedToExcel = () => {
		let excelFile = {};
		excelFile.fileName = `과속 데이터_${moment(startDate).format("l")}-${moment(
			endTime
		).format("l")}`;
		excelFile.datas = [
			{
				sheetData: overSpeedDataTotal,
				sheetName: "전체",
				sheetFilter: [
					"time",
					"vehicleType",
					"licenseNumber",
					"speed",
					"laneNumber",
					"imageLink",
				],
				sheetHeader: [
					"시간",
					"차종",
					"차량번호",
					"위반속도",
					"차선",
					"이미지 링크",
				],
			},
		];
		let toExcel = new ExportJsonExcel(excelFile);
		toExcel.saveExcel();
	};
	const downloadSecondTableToExcel = () => {
		let excelFile = {};
		excelFile.fileName = `2차 데이터_${moment(startDate).format("l")}-${moment(
			endTime
		).format("l")}`;
		excelFile.datas = [
			{
				sheetData: secondDataTotal,
				sheetName: "전체",
				sheetFilter: [
					"time",
					"totalPHF",
					"totalPeekHourCnt",
					"totalVehiclePeakHourConcentrationRatio",
					"totalDayNightRatio",
					"carDayNightRatio",
					"busDayNightRatio",
					"truckDayNightRatio",
					"motorDayNightRatio",
				],
				sheetHeader: [
					"시간",
					"PHF",
					"점두유율",
					"집중율",
					"전체 주야율",
					"승용차 주야율",
					"버스 주야율",
					"트럭 주야율",
					"오토바이 주야율",
				],
			},
		];
		let toExcel = new ExportJsonExcel(excelFile);
		toExcel.saveExcel();
	};

	const downloadFirstTableToExcel = () => {
		firstDataLaneTotalTemp = {};
		setFirstDataLaneTotal({});
		let excelFile = {};
		excelFile.fileName = `1차 데이터_${moment(startDate).format("l")}-${moment(
			endTime
		).format("l")}`;
		let Datas = [
			{
				sheetData: firstDataTotal,
				sheetName: "전체",
				sheetFilter: firstDataFilter,
				sheetHeader: firstDataHeaders,
			},
		];
		for (var idx = 1; idx <= camLanes; idx++) {
			axiosAsyncFirstLane(idx);
			if (!isLoadingLane) {
				Datas.push({
					sheetData: firstDataLaneTotal[idx],
					sheetName: `${idx} 차선`,
					sheetFilter: firstDataFilter,
					sheetHeader: firstDataHeaders,
				});
				if (idx === camLanes) {
					excelFile.datas = Datas;
					let toExcel = new ExportJsonExcel(excelFile);
					toExcel.saveExcel();
				}
			}
		}
	};
	const axiosAsyncFS = () => {
		var firstDataParsedTotal = [];
		var secondDataParsedTotal = [];
		var firstDataParsed = [];
		var secondDataParsed = [];
		axios
			.get(
				`${baseURL}${trafficURL}/daily?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&axis=time&laneNumber=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				if (res.data.length !== 0) {
					setMsg(false);
					res.data.some((eachData, index) => {
						const {
							recordTime,
							totalVehicleVolume,
							totalVehicleAvgSpeed,
							totalVehiclePassengerCarUnit,
							totalVehicleSpdVolume,
							carVolume,
							carAvgSpeed,
							carPassengerCarUnit,
							carVehicleRatio,
							carSpdVolume,
							mBusVolume,
							mBusAvgSpeed,
							mBusPassengerCarUnit,
							mBusVehicleRatio,
							mBusSpdVolume,
							mTruckVolume,
							mTruckAvgSpeed,
							mTruckPassengerCarUnit,
							mTruckVehicleRatio,
							mTruckSpdVolume,
							motorVolume,
							motorAvgSpeed,
							motorPassengerCarUnit,
							motorVehicleRatio,
							motorSpdVolume,
							pedestrianVolume,
							jaywalkVolume,
							totalVehicleDayNightRatio,
							totalVehiclePeakHourFactor,
							totalVehiclePeakHourConcentrationRatio,
							totalVehiclePeakHourFlowRate,
							carDayNightRatio,
							mBusDayNightRatio,
							mTruckDayNightRatio,
							motorDayNightRatio,
							totalVehiclePeakHourTime,
						} = eachData;
						let firstDataTemp = {};
						let secondDataTemp = {};

						if (recordTime === "ALL") {
							secondDataTemp["key"] = index + 1;
							secondDataTemp["time"] = moment(totalVehiclePeakHourTime).format(
								"YYYY년 MM월 DD일"
							);
							secondDataTemp["totalDayNightRatio"] = totalVehicleDayNightRatio;
							secondDataTemp["totalPHF"] = totalVehiclePeakHourFactor;
							secondDataTemp["totalPeekHourCnt"] = totalVehiclePeakHourFlowRate;
							secondDataTemp["totalVehiclePeakHourConcentrationRatio"] =
								totalVehiclePeakHourConcentrationRatio;

							secondDataTemp["carDayNightRatio"] = carDayNightRatio;
							secondDataTemp["busDayNightRatio"] = mBusDayNightRatio;
							secondDataTemp["truckDayNightRatio"] = mTruckDayNightRatio;
							secondDataTemp["motorDayNightRatio"] = motorDayNightRatio;
							secondDataParsedTotal.push(secondDataTemp);

							if (countSecondCol < 5) {
								countSecondCol += 1;
								secondDataParsed.push(secondDataTemp);
							}
							if (countSecondCol === 5) {
								setSecondData(secondDataParsed);
							}
						} else {
							firstDataTemp["key"] = index + 1;
							firstDataTemp["time"] = moment(recordTime).format(
								"YYYY년 MM월 DD일 HH:mm:ss"
							);

							firstDataTemp["totalCount"] = totalVehicleVolume;
							firstDataTemp["totalAvgSpeed"] = totalVehicleAvgSpeed;
							firstDataTemp["totalpcu"] = totalVehiclePassengerCarUnit;
							firstDataTemp["totalOverSpeed"] = totalVehicleSpdVolume;

							firstDataTemp["carCount"] = carVolume;
							firstDataTemp["carAvgSpeed"] = carAvgSpeed;
							firstDataTemp["carpcu"] = carPassengerCarUnit;
							firstDataTemp["carRatio"] = carVehicleRatio;
							firstDataTemp["carOverSpeed"] = carSpdVolume;

							firstDataTemp["busCount"] = mBusVolume;
							firstDataTemp["busAvgSpeed"] = mBusAvgSpeed;
							firstDataTemp["buspcu"] = mBusPassengerCarUnit;
							firstDataTemp["busRatio"] = mBusVehicleRatio;
							firstDataTemp["busOverSpeed"] = mBusSpdVolume;

							firstDataTemp["truckCount"] = mTruckVolume;
							firstDataTemp["truckAvgSpeed"] = mTruckAvgSpeed;
							firstDataTemp["truckpcu"] = mTruckPassengerCarUnit;
							firstDataTemp["truckRatio"] = mTruckVehicleRatio;
							firstDataTemp["truckOverSpeed"] = mTruckSpdVolume;

							firstDataTemp["motorCount"] = motorVolume;
							firstDataTemp["motorAvgSpeed"] = motorAvgSpeed;
							firstDataTemp["motorpcu"] = motorPassengerCarUnit;
							firstDataTemp["motorRatio"] = motorVehicleRatio;
							firstDataTemp["motorOverSpeed"] = motorSpdVolume;
							firstDataTemp["person"] = pedestrianVolume;
							firstDataTemp["jaywalk"] = jaywalkVolume;

							firstDataParsedTotal.push(firstDataTemp);
							if (countFirstCol < 5) {
								countFirstCol += 1;
								firstDataParsed.push(firstDataTemp);
							}
							if (countFirstCol === 5) {
								setFirstData(firstDataParsed);
							}
						}
					});
					if (secondData.length === 0) {
						setSecondData(secondDataParsed);
					}
					setFirstDataTotal(firstDataParsedTotal);
					setSecondDataTotal(secondDataParsedTotal);
					setLoadingFirst(false);
					setLoadingSecond(false);
				} else {
					setEmptyTrafficData(true);
					message.warning("해당 기간 데이터가 없습니다");
				}
			})
			.catch((err) => {
				console.log(err.response);
				setMsg(true);
				if (err.response.status === 400) {
					if (
						new Date(endTime).getTime() >=
						new Date(moment(new Date()).format("YYYY-MM-DD")).getTime()
					) {
						message.warning("해당 기간 데이터가 없습니다");
					} else {
						message.warning("최대 31일까지 조회 할 수 있습니다");
					}
				} else if (err.response.status === 404) {
					setEmptyTrafficData(true);
					message.warning("해당 기간 데이터가 없습니다");
				} else if (err.response.status === 401) {
					message.warning(
						"로그인 정보가 유효하지 않습니다. 다시 로그인해주세요"
					);
					setLoggedIn(false);
				}
			});
	};
	const axiosOverSpeedData = () => {
		setOverSpeedData([]);
		setOverSpeedDataTotal([]);
		var OverSpeedParsedTotal = [];
		var OverSpeedParsed = [];
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
					setMsg(false);
					res.data.forEach((eachData, index) => {
						const {
							recordTime,
							vehicleType,
							licenseNumber,
							speed,
							imageLink,
							laneNumber,
						} = eachData;
						let overSpeedDataTemp = {};

						overSpeedDataTemp["key"] = index;
						overSpeedDataTemp["time"] = moment(recordTime).format(
							"YYYY년 MM월 DD일 HH:mm:ss"
						);

						overSpeedDataTemp["vehicleType"] = vehicleType;
						overSpeedDataTemp["licenseNumber"] = licenseNumber;
						overSpeedDataTemp["speed"] = speed;
						overSpeedDataTemp["laneNumber"] = `${laneNumber} 차선`;

						overSpeedDataTemp["imageLink"] = imageLink;
						OverSpeedParsedTotal.push(overSpeedDataTemp);
						if (countOverSpeedCol < 5) {
							countOverSpeedCol += 1;
							OverSpeedParsed.push(overSpeedDataTemp);
							setOverSpeedData(OverSpeedParsed);
						}
					});
					setOverSpeedDataTotal(OverSpeedParsedTotal);
					setLoadingOverSpeed(false);
				} else {
					setMsg(true);
					setEmptyOverSpeedData(true);
					message.warning("해당 기간 과속 데이터가 없습니다");
				}
			})
			.catch((err) => {
				console.log(err.response);
				setMsg(true);
				setEmptyOverSpeedData(true);
				if (
					!new Date(endTime).getTime() >=
					new Date(moment(new Date()).format("YYYY-MM-DD")).getTime()
				) {
					message.warning("해당 기간 과속 데이터가 없습니다");
				} else if (err.response.status === 401) {
					setLoggedIn(false);
				}
			});
	};
	const axiosAsyncFirstLane = (laneNum) => {
		setLoadingLane(true);
		var firstDataLane = [];
		axios
			.get(
				`${baseURL}${trafficURL}/daily?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&axis=time&laneNumber=${laneNum.toString()}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				if (res.data.length !== 0) {
					res.data.some((eachData, index) => {
						const {
							recordTime,
							totalVehicleVolume,
							totalVehicleAvgSpeed,
							totalVehiclePassengerCarUnit,
							totalVehicleSpdVolume,
							carVolume,
							carAvgSpeed,
							carPassengerCarUnit,
							carVehicleRatio,
							carSpdVolume,
							mBusVolume,
							mBusAvgSpeed,
							mBusPassengerCarUnit,
							mBusVehicleRatio,
							mBusSpdVolume,
							mTruckVolume,
							mTruckAvgSpeed,
							mTruckPassengerCarUnit,
							mTruckVehicleRatio,
							mTruckSpdVolume,
							motorVolume,
							motorAvgSpeed,
							motorPassengerCarUnit,
							motorVehicleRatio,
							motorSpdVolume,
						} = eachData;
						let laneDataTemp = {};
						if (recordTime === "ALL") {
							return false;
						} else {
							laneDataTemp["key"] = index + 1;
							laneDataTemp["time"] = moment(recordTime).format(
								"YYYY년 MM월 DD일 HH:mm:ss"
							);

							laneDataTemp["totalCount"] = totalVehicleVolume;
							laneDataTemp["totalAvgSpeed"] = totalVehicleAvgSpeed;
							laneDataTemp["totalpcu"] = totalVehiclePassengerCarUnit;
							laneDataTemp["totalOverSpeed"] = totalVehicleSpdVolume;

							laneDataTemp["carCount"] = carVolume;
							laneDataTemp["carAvgSpeed"] = carAvgSpeed;
							laneDataTemp["carpcu"] = carPassengerCarUnit;
							laneDataTemp["carRatio"] = carVehicleRatio;
							laneDataTemp["carOverSpeed"] = carSpdVolume;

							laneDataTemp["busCount"] = mBusVolume;
							laneDataTemp["busAvgSpeed"] = mBusAvgSpeed;
							laneDataTemp["buspcu"] = mBusPassengerCarUnit;
							laneDataTemp["busRatio"] = mBusVehicleRatio;
							laneDataTemp["busOverSpeed"] = mBusSpdVolume;

							laneDataTemp["truckCount"] = mTruckVolume;
							laneDataTemp["truckAvgSpeed"] = mTruckAvgSpeed;
							laneDataTemp["truckpcu"] = mTruckPassengerCarUnit;
							laneDataTemp["truckRatio"] = mTruckVehicleRatio;
							laneDataTemp["truckOverSpeed"] = mTruckSpdVolume;

							laneDataTemp["motorCount"] = motorVolume;
							laneDataTemp["motorAvgSpeed"] = motorAvgSpeed;
							laneDataTemp["motorpcu"] = motorPassengerCarUnit;
							laneDataTemp["motorRatio"] = motorVehicleRatio;
							laneDataTemp["motorOverSpeed"] = motorSpdVolume;
							firstDataLane.push(laneDataTemp);
						}
					});
					firstDataLaneTotalTemp[laneNum] = firstDataLane;
					setFirstDataLaneTotal(firstDataLaneTotalTemp);
					setLoadingLane(false);
				} else {
					setEmptyTrafficData(true);
					message.warning("해당 기간 데이터가 없습니다");
				}
			})
			.catch((err) => {
				console.log(err);
				if (err.response.status === 401) {
					// message.warning(
					// 	"로그인 정보가 유효하지 않습니다. 다시 로그인해주세요"
					// );
					setLoggedIn(false);
				}
			});
	};
	const collapseHeaderFirst = (
		<div className="table-collapse-header">
			1차 데이터
			<Divider type="vertical" />
			{moment(startDate).format("LL")} ~ {moment(endTime).format("LL")}
			<Divider type="vertical" />
			전체 및 특정 차선 데이터 <Divider type="vertical" />
			15분 단위 <Divider type="vertical" />
		</div>
	);

	const collapseHeaderSecond = (
		<div className="table-collapse-header">
			2차 데이터
			<Divider type="vertical" />
			{moment(startDate).format("LL")} ~ {moment(endTime).format("LL")}
			<Divider type="vertical" />
			전체 데이터 <Divider type="vertical" />
			하루 단위 <Divider type="vertical" />
		</div>
	);
	const collapseHeaderOverSpeed = (
		<div className="table-collapse-header">
			과속 데이터
			<Divider type="vertical" />
			{moment(startDate).format("LL")} ~ {moment(endTime).format("LL")}
			<Divider type="vertical" />
			전체 데이터 <Divider type="vertical" />
		</div>
	);
	const genExtra = (tableIdx) => (
		<div
			onClick={(event) => {
				// If you don't want click extra trigger collapse, you can prevent this:
				event.stopPropagation();
				if (tableIdx === "FIRST") {
					downloadFirstTableToExcel();
				} else if (tableIdx === "SECOND") {
					downloadSecondTableToExcel();
				} else {
					downloadOverSpeedToExcel();
				}
			}}
		>
			<DownloadOutlined />
			다운로드
		</div>
	);

	return (
		<>
			{errorMsg ? null : isEmptyTrafficData ? null : (
				<div className="table-collapse">
					<Title level={5} style={{ marginTop: 10 }}>
						{camera} 데이터 조회 결과
					</Title>
					<Divider />
					{isLoadingSecond ? (
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
						<>
							<Collapse
								accordion
								expandIconPosition="right"
								expandIcon={({ isActive }) => (
									<div style={{ fontSize: 14, marginTop: -2 }}>
										<EyeOutlined />
										미리보기
									</div>
								)}
							>
								<Panel
									header={collapseHeaderFirst}
									key="1"
									extra={genExtra("FIRST")}
								>
									데이터 형식 미리보기 (5줄까지)
									{isLoadingFirst ? (
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
										<>
											<FirstTable firstData={firstData} />
										</>
									)}
								</Panel>
								<Panel
									header={collapseHeaderSecond}
									key="2"
									extra={genExtra("SECOND")}
								>
									데이터 형식 미리보기 (5줄까지)
									{isLoadingSecond ? (
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
										<SecondTable secondData={secondData} />
									)}
								</Panel>
								<Panel
									header={collapseHeaderOverSpeed}
									key="3"
									extra={genExtra("OVERSPEED")}
								>
									{isEmptyOverSpeedData ? (
										<Text strong type="danger">
											해당 기간 과속 데이터가 없습니다
										</Text>
									) : isLoadingOverSpeed ? (
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
										<>
											데이터 형식 미리보기 (5줄까지)
											<SearchOverSpeedTable
												overSpeedData={overSpeedData}
												isEmptyOverSpeedData={isEmptyOverSpeedData}
											/>
										</>
									)}
								</Panel>
							</Collapse>
						</>
					)}
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
		camera: state.location.camera,
		baseURL: state.baseURL.baseURL,
		trafficURL: state.baseURL.trafficURL,
		camLanes: state.locationCode.camLanes,
	};
};

export default connect(mapStateToProps)(SearchCollapsedTable);
