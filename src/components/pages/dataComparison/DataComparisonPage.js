import React, { useState } from "react";
import { Layout } from "antd";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchComparison from "../../organisms/searchComparison/SearchComparison";
import ComVisualization from "../../organisms/comVisualization/ComVisualization";

const DataComparisonPage = () => {
	const [period, setPeriod] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endTime, setEndTime] = useState("");
	const [selectedLocation1, setSelectedLocation1] = useState([]);
	const [selectedLocationCode1, setSelectedLocationCode1] = useState([]);
	const [selectedLocation2, setSelectedLocation2] = useState([]);
	const [selectedLocationCode2, setSelectedLocationCode2] = useState([]);

	const { Content } = Layout;

	return (
		<div className="statistic-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["대시보드", "데이터 비교"]} />
						<SearchComparison
							period={period}
							setPeriod={setPeriod}
							setStartDate={setStartDate}
							setEndTime={setEndTime}
							setSelectedLocation1={setSelectedLocation1}
							setSelectedLocationCode1={setSelectedLocationCode1}
							setSelectedLocation2={setSelectedLocation2}
							setSelectedLocationCode2={setSelectedLocationCode2}
						/>
						<ComVisualization
							period={period}
							selectedLocation1={selectedLocation1}
							selectedLocationCode1={selectedLocationCode1}
							selectedLocation2={selectedLocation2}
							selectedLocationCode2={selectedLocationCode2}
						/>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default DataComparisonPage;
