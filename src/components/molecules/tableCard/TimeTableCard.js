import React from "react";
// import {
// 	BrowserView,
// 	MobileView,
// 	isBrowser,
// 	isMobile,
// } from "react-device-detect";

import TableDescription from "../tableDescription/TableDescription";

import DTFirstTable from "../StatisticsTable/dayTable/DTFirstTable";
import DTSecondTable from "../StatisticsTable/dayTable/DTSecondTable";

import WTSecondTable from "../StatisticsTable/weekTable/WTSecondTable";
import WTFirstTable from "../StatisticsTable/weekTable/WTFirstTable";

import MTFirstTable from "../StatisticsTable/monthTable/MTFirstTable";
import MTSecondTable from "../StatisticsTable/monthTable/MTSecondTable";
import "./style.less";

const TimeTableCard = (props) => {
	const {
		period,
		tableKey,
		currentLaneNum,
		trafficTotalData,
		startDate,
		endTime,
		currentTime,
		page = "",
		isEmptyData,
	} = props;

	return (
		<div className="table-card">
			{period === "DAY" ? (
				tableKey === "first" ? (
					<>
						<TableDescription
							period={period}
							startDate={startDate}
							endTime={endTime}
							timeClassification={true}
							tableKey={tableKey}
							page={page}
							currentTime={currentTime}
						/>
						<DTFirstTable
							currentLaneNum={parseInt(currentLaneNum)}
							trafficTotalData={trafficTotalData}
							page={page}
							isEmptyData={isEmptyData}
						/>
					</>
				) : parseInt(currentLaneNum) === 0 ? (
					<>
						<TableDescription
							period={period}
							startDate={startDate}
							endTime={endTime}
							timeClassification={true}
							tableKey={tableKey}
						/>
						{/* {tableKey === "overSpeed" ? (
							<OverSpeedTable
								startDate={startDate}
								endTime={endTime}
								setLoggedIn={setLoggedIn}
							/>
						) : ( */}
						<DTSecondTable
							currentLaneNum={parseInt(currentLaneNum)}
							trafficTotalData={trafficTotalData}
						/>
						{/* )} */}
					</>
				) : null
			) : period === "WEEK" ? (
				tableKey === "first" ? (
					<>
						<TableDescription
							period={period}
							startDate={startDate}
							endTime={endTime}
							timeClassification={true}
							tableKey={tableKey}
						/>
						<WTFirstTable
							currentLaneNum={parseInt(currentLaneNum)}
							trafficTotalData={trafficTotalData}
						/>
					</>
				) : parseInt(currentLaneNum) === 0 ? (
					<>
						<TableDescription
							period={period}
							startDate={startDate}
							endTime={endTime}
							timeClassification={true}
							tableKey={tableKey}
						/>

						<WTSecondTable
							currentLaneNum={parseInt(currentLaneNum)}
							trafficTotalData={trafficTotalData}
						/>
					</>
				) : null
			) : tableKey === "first" ? (
				<>
					<TableDescription
						period={period}
						startDate={startDate}
						endTime={endTime}
						timeClassification={true}
						tableKey={tableKey}
					/>
					<MTFirstTable
						currentLaneNum={parseInt(currentLaneNum)}
						trafficTotalData={trafficTotalData}
					/>
				</>
			) : parseInt(currentLaneNum) === 0 ? (
				<>
					<TableDescription
						period={period}
						startDate={startDate}
						endTime={endTime}
						timeClassification={true}
						tableKey={tableKey}
					/>
					<MTSecondTable
						currentLaneNum={parseInt(currentLaneNum)}
						trafficTotalData={trafficTotalData}
					/>
				</>
			) : null}
		</div>
	);
};

export default TimeTableCard;
