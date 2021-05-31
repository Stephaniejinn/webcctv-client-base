import React, { useState } from "react";
import { Layout, Typography } from "antd";
import { connect } from "react-redux";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchData from "../../organisms/searchData/SearchData";
import OverspeedTable from "../../molecules/StatisticsTable/OverSpeedTable";

import "./style.less";

const OverspeedPage = (props) => {
	const { camera } = props;

	const { setLoggedIn, isMaster } = props;
	const [timeClassification, setTimeClassification] = useState(true);
	const [firstFilter, setFirstFilter] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endTime, setEndTime] = useState("");
	const [count, setCount] = useState(false);
	const [isRefresh, setRefresh] = useState(false);

	const { Content } = Layout;
	const { Title } = Typography;

	return (
		<div className="page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header setLoggedIn={setLoggedIn} isMaster={isMaster} />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["대시보드", "과속 데이터 조회"]} />
						<SearchData
							period="OVERSPEED"
							classification={timeClassification}
							setClassification={setTimeClassification}
							startDate={startDate}
							setStartDate={setStartDate}
							endTime={endTime}
							setEndTime={setEndTime}
							setFirstFilter={setFirstFilter}
							setCount={setCount}
							setLoggedIn={setLoggedIn}
							setRefresh={setRefresh}
						/>
						{firstFilter ? (
							<>
								<Title level={5} style={{ marginBottom: 15 }}>
									{camera}
								</Title>
								<OverspeedTable
									startDate={startDate}
									endTime={endTime}
									setLoggedIn={setLoggedIn}
									isRefresh={isRefresh}
									setRefresh={setRefresh}
								/>
							</>
						) : null}
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		camera: state.location.camera,
	};
};

export default connect(mapStateToProps)(OverspeedPage);
