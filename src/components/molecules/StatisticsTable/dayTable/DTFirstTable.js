import React, { useEffect, useState } from "react";
import { Table, Spin, Typography } from "antd";
import moment from "moment";

// import axios from "axios";
// import { connect } from "react-redux";
// import * as actions from "../../../../redux/actions";

import "../style.less";

const DTFisrtTable = (props) => {
	const { currentLaneNum, trafficTotalData, page, isEmptyData = false } = props;
	const { Text } = Typography;

	const [Data, setData] = useState([]);

	var FristRow;

	useEffect(() => {
		FristRow = true;
		setData([]);
		axiosData();
	}, [trafficTotalData]);

	var columns;
	if (currentLaneNum === 0) {
		columns = [
			{
				title: "시간",
				dataIndex: "time",
			},
			{
				title: "전체",
				dataIndex: "Total",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "totalCount",
						key: "count",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "totalAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "totalpcu",
						key: "pcu",
					},
					{
						title: "과속(대)",
						dataIndex: "totalOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "승용차",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "carCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "carAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "carpcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "carRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "carOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "버스",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "busCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "busAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "buspcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "busRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "busOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "화물차",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "truckCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "truckAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "truckpcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "truckRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "truckOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "이륜차",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "motorCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "motorAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "motorpcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "motorRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "motorOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "보행자",
				children: [
					{
						title: "수(명)",
						dataIndex: "person",
						key: "carCount",
					},
					{
						title: "무단횡단(명)",
						dataIndex: "jaywalk",
						key: "avgSpeed",
					},
				],
			},
		];
	} else {
		columns = [
			{
				title: "시간",
				dataIndex: "time",
			},
			{
				title: "전체",
				dataIndex: "Total",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "totalCount",
						key: "count",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "totalAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "totalpcu",
						key: "pcu",
					},
					{
						title: "과속(대)",
						dataIndex: "totalOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "승용차",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "carCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "carAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "carpcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "carRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "carOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "버스",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "busCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "busAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "buspcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "busRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "busOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "화물차",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "truckCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "truckAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "truckpcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "truckRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "truckOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "이륜차",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "motorCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "motorAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "motorpcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "motorRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "motorOverSpeed",
						key: "overSpeed",
					},
				],
			},
		];
	}

	const axiosData = () => {
		var TotalData = [];
		trafficTotalData.forEach((eachData, index) => {
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
			} = eachData;
			let dataTemp = {};

			dataTemp["key"] = index + 1;

			if (FristRow) {
				if (page === "REALSTATISTIC") {
					dataTemp["time"] = moment(recordTime).format("HH:mm");
					FristRow = false;
				} else {
					dataTemp["time"] = "전체";
					FristRow = false;
				}
			} else {
				dataTemp["time"] = moment(recordTime).format("HH:mm");
			}
			dataTemp["totalCount"] = totalVehicleVolume;
			dataTemp["totalAvgSpeed"] = totalVehicleAvgSpeed;
			dataTemp["totalpcu"] = totalVehiclePassengerCarUnit;
			dataTemp["totalOverSpeed"] = totalVehicleSpdVolume;

			dataTemp["carCount"] = carVolume;
			dataTemp["carAvgSpeed"] = carAvgSpeed;
			dataTemp["carpcu"] = carPassengerCarUnit;
			dataTemp["carRatio"] = carVehicleRatio;
			dataTemp["carOverSpeed"] = carSpdVolume;

			dataTemp["busCount"] = mBusVolume;
			dataTemp["busAvgSpeed"] = mBusAvgSpeed;
			dataTemp["buspcu"] = mBusPassengerCarUnit;
			dataTemp["busRatio"] = mBusVehicleRatio;
			dataTemp["busOverSpeed"] = mBusSpdVolume;

			dataTemp["truckCount"] = mTruckVolume;
			dataTemp["truckAvgSpeed"] = mTruckAvgSpeed;
			dataTemp["truckpcu"] = mTruckPassengerCarUnit;
			dataTemp["truckRatio"] = mTruckVehicleRatio;
			dataTemp["truckOverSpeed"] = mTruckSpdVolume;

			dataTemp["motorCount"] = motorVolume;
			dataTemp["motorAvgSpeed"] = motorAvgSpeed;
			dataTemp["motorpcu"] = motorPassengerCarUnit;
			dataTemp["motorRatio"] = motorVehicleRatio;
			dataTemp["motorOverSpeed"] = motorSpdVolume;
			if (currentLaneNum === 0) {
				dataTemp["person"] = pedestrianVolume;
				dataTemp["jaywalk"] = jaywalkVolume;
			}

			TotalData.push(dataTemp);
		});
		setData(TotalData);
	};

	return (
		<>
			{isEmptyData ? (
				page === "REALSTATISTIC" && (
					<div
						style={{
							marginTop: 20,
							marginBottom: 20,
							textAlign: "center",
							paddingTop: 30,
							paddingBottom: 30,
						}}
					>
						<Text strong type="danger">
							해당 데이터가 없습니다
						</Text>
					</div>
				)
			) : Data.length === 0 ? (
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
				<Table columns={columns} dataSource={Data} size="small" bordered />
			)}
		</>
	);
};

export default DTFisrtTable;
