import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";

import "../style.less";

const DTSecondTable = (props) => {
	const { currentLaneNum, trafficTotalData } = props;
	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (currentLaneNum === 0) {
			setLoading(true);
			setData([]);
			parseData();
		}
	}, [trafficTotalData]);

	const columns = [
		{
			title: "",
			dataIndex: "item",
		},
		{
			title: "전체",
			dataIndex: "total",
		},
		{
			title: "승용차",
			dataIndex: "car",
		},
		{
			title: "버스",
			dataIndex: "bus",
		},
		{
			title: "화물차",
			dataIndex: "truck",
		},
		{
			title: "이륜차",
			dataIndex: "motor",
		},
	];

	var data = [
		{
			key: "0",
			item: "주간",
			total: 0,
			car: 0,
			bus: 0,
			truck: 0,
			motor: 0,
		},
		{
			key: "1",
			item: "야간",
			total: 0,
			car: 0,
			bus: 0,
			truck: 0,
			motor: 0,
		},
		{
			key: "3",
			item: "주야율",
			total: 0,
			car: 0,
			bus: 0,
			truck: 0,
			motor: 0,
		},
		{
			key: "4",
			item: "PHF",
			total: 0,
			car: "/",
			bus: "/",
			truck: "/",
			motor: "/",
		},
		{
			key: "5",
			item: "첨두시간",
			total: "",
			car: "/",
			bus: "/",
			truck: "/",
			motor: "/",
		},
		{
			key: "6",
			item: "첨두유율",
			total: 0,
			car: "/",
			bus: "/",
			truck: "/",
			motor: "/",
		},
		{
			key: "7",
			item: "집중율",
			total: 0,
			car: "/",
			bus: "/",
			truck: "/",
			motor: "/",
		},
	];

	const parseData = () => {
		if (trafficTotalData.length !== 0) {
			const trafficData = trafficTotalData[0];
			data[0]["total"] = trafficData["totalVehicleDaytimeVolume"];
			data[0]["car"] = trafficData["carDaytimeVolume"];
			data[0]["bus"] = trafficData["mBusDaytimeVolume"];
			data[0]["truck"] = trafficData["mTruckDaytimeVolume"];
			data[0]["motor"] = trafficData["motorDaytimeVolume"];

			data[1]["total"] = trafficData["totalVehicleNighttimeVolume"];
			data[1]["car"] = trafficData["carNighttimeVolume"];
			data[1]["bus"] = trafficData["mBusNighttimeVolume"];
			data[1]["truck"] = trafficData["mTruckNighttimeVolume"];
			data[1]["motor"] = trafficData["motorNighttimeVolume"];

			data[2]["total"] = trafficData["totalVehicleDayNightRatio"];
			data[2]["car"] = trafficData["carDayNightRatio"];
			data[2]["bus"] = trafficData["mBusDayNightRatio"];
			data[2]["truck"] = trafficData["mTruckDayNightRatio"];
			data[2]["motor"] = trafficData["motorDayNightRatio"];

			data[3]["total"] = trafficData["totalVehiclePeakHourFactor"];

			data[4]["total"] = trafficData["totalVehiclePeak15MinuteTime"];

			data[5]["total"] = trafficData["totalVehiclePeakHourConcentrationRatio"];

			data[6]["total"] = trafficData["totalVehiclePeakHourFlowRate"];

			setData(data);
			setLoading(false);
		}
	};

	return (
		<>
			{isLoading ? (
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
export default DTSecondTable;
