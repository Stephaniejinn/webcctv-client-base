import React, { useEffect, useState } from "react";
import { Statistic } from "antd";

const PHF = (props) => {
	const { activeVisualKey, trafficTotalData } = props;
	const [PHF, setPHF] = useState("");

	useEffect(() => {
		if (activeVisualKey === "9") {
			setPHF(trafficTotalData[0]["totalVehiclePeakHourFactor"]);
		}
	}, [trafficTotalData, activeVisualKey]);

	return <Statistic title="PHF" value={PHF} />;
};

export default PHF;
