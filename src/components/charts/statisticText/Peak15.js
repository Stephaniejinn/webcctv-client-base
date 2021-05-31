import React, { useEffect, useState } from "react";
import { Statistic } from "antd";

const Peak15 = (props) => {
	const { activeVisualKey, trafficTotalData } = props;
	const [peak15, setPeakHour] = useState("");

	useEffect(() => {
		if (activeVisualKey === "7") {
			setPeakHour(trafficTotalData[0]["totalVehiclePeak15MinuteTime"]);
		}
	}, [trafficTotalData, activeVisualKey]);

	return <Statistic title="첨두시간" value={peak15} />;
};

export default Peak15;
