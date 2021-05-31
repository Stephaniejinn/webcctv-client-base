import React, { useEffect, useState } from "react";
import { TinyColumn } from "@ant-design/charts";
import { Spin } from "antd";

const AvgSpeedTinyColumn = (props) => {
	const { trafficData } = props;

	const [Data, setData] = useState([]);
	const [isLoadingData, setLoadingData] = useState(true);

	useEffect(() => {
		setLoadingData(true);
		setData([]);
		parseTrafficData();
	}, [trafficData]);

	const parseTrafficData = () => {
		var speedData = [0, 0, 0, 0];

		speedData[0] = trafficData[0]["carAvgSpeed"];
		speedData[1] = trafficData[0]["mBusAvgSpeed"];
		speedData[2] = trafficData[0]["mTruckAvgSpeed"];
		speedData[3] = trafficData[0]["motorAvgSpeed"];

		setData(speedData);
		setLoadingData(false);
	};

	var customlabel = ["승용차", "버스", "화물차", "오토바이"];

	var config = {
		autoFit: true,
		data: Data,
		tooltip: {
			customContent: function customContent(x, data) {
				var label = "car";
				var _data$, _data$$data;
				if (x !== null) {
					label = customlabel[x];
				}
				return label
					.concat(": ")
					.concat(
						(_data$ = data[0]) === null || _data$ === void 0
							? void 0
							: (_data$$data = _data$.data) === null || _data$$data === void 0
							? void 0
							: _data$$data.y.toFixed(2),
						"km/h"
					);
			},
			// showTitle: true,
		},
	};
	return (
		<>
			{isLoadingData ? (
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
				<TinyColumn {...config} />
			)}
		</>
	);
};

export default AvgSpeedTinyColumn;
