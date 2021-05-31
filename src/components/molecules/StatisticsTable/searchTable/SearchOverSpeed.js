import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";

import "../style.less";

const SearchOverSpeedTable = (props) => {
	const { overSpeedData, isEmptyOverSpeedData } = props;

	const [Data, setData] = useState([]);

	useEffect(() => {
		setData(overSpeedData);
	}, [overSpeedData]);

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
			title: "위반속도(km/h)",
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
		},
	];

	return (
		<>
			{!isEmptyOverSpeedData ? (
				Data.length === 0 ? (
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
				)
			) : null}
		</>
	);
};

export default SearchOverSpeedTable;
