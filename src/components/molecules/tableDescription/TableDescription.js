import React from "react";
import { Typography, Divider } from "antd";
import moment from "moment";
import "moment-timezone";

import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import "./style.less";

const TableDescription = (props) => {
	const {
		period,
		tableKey,
		startDate,
		endTime,
		camera,
		currentTime,
		page = "",
	} = props;

	const { Title, Text } = Typography;

	const periodText =
		period === "DAY" ? "일간" : period === "WEEK" ? "주간" : "월간";
	const dataTypeText =
		tableKey === "first" ? "1차" : tableKey === "second" ? "2차" : "과속 ";

	var timeCalc;
	if (page === "REALSTATISTIC") {
		let curTime = moment(new Date()).format("YYYY-MM-DD HH");
		let nearest15 = Math.floor(currentTime.minute() / 15) * 15;
		timeCalc = moment(
			curTime + `:${nearest15 === 0 ? "00" : nearest15}:00`
		).format("HH:mm");
	}

	return (
		<div className="table-description">
			{page === "REALSTATISTIC" ? (
				<Title level={5}> 실시간 통계 데이터</Title>
			) : tableKey === "overSpeed" ? (
				<Title level={5}>
					{periodText} {dataTypeText} 데이터
				</Title>
			) : (
				<Title level={5}>
					{periodText} 누적 통계 {dataTypeText} 데이터 분석
				</Title>
			)}
			<Divider />
			<Text>
				{period === "DAY" ? (
					page === "REALSTATISTIC" ? (
						<>
							{camera.length === 0 ? "수인사거리-1 [하행]" : camera}
							<Divider type="vertical" />
							{moment(startDate).format("YYYY년 MM월 DD일")}
							<Divider type="vertical" />
							00:00 ~ {timeCalc}
						</>
					) : (
						<>
							{dataTypeText} 데이터 <Divider type="vertical" /> {camera}
							<Divider type="vertical" />
							{moment(startDate).format("YYYY년 MM월 DD일")}
						</>
					)
				) : (
					<>
						{dataTypeText} 데이터 <Divider type="vertical" /> {camera}
						<Divider type="vertical" />
						{moment(startDate).format("YYYY년 MM월 DD일")} ~{" "}
						{moment(endTime).format("YYYY년 MM월 DD일")}
					</>
				)}
			</Text>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		camera: state.location.camera,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getLocationInfo: () => {
			dispatch(actions.getLocation());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(TableDescription);
