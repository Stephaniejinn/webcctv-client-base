import React, { useEffect, useState } from "react";
import { Statistic } from "antd";

const PeakHour = (props) => {
	const { activeVisualKey, trafficTotalData } = props;
	const [peakHour, setPeakHour] = useState(0);

	useEffect(() => {
		if (activeVisualKey === "8") {
			setPeakHour(trafficTotalData[0]["totalVehiclePeakHourFlowRate"]);
		}
	}, [trafficTotalData, activeVisualKey]);

	return <Statistic title="첨두유율" value={peakHour} />;
};

export default PeakHour;
