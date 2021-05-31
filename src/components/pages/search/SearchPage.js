import React, { useState } from "react";
import { Layout, Spin } from "antd";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchData from "../../organisms/searchData/SearchData";
import SearchCollapsedTable from "../../organisms/searchCollapsedTable/SearchCollapsedTable";

import "./style.less";

const SearchDownloadPage = (props) => {
	const { setLoggedIn, isMaster } = props;
	const [timeClassification, setTimeClassification] = useState(true);
	const [firstFilter, setFirstFilter] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endTime, setEndTime] = useState("");
	const [count, setCount] = useState(false);

	const { Content } = Layout;

	return (
		<div className="page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header setLoggedIn={setLoggedIn} isMaster={isMaster} />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["대시보드", "기간 별 데이터 조회"]} />
						<SearchData
							period="SEARCH"
							classification={timeClassification}
							setClassification={setTimeClassification}
							startDate={startDate}
							setStartDate={setStartDate}
							endTime={endTime}
							setEndTime={setEndTime}
							setFirstFilter={setFirstFilter}
							setCount={setCount}
							setLoggedIn={setLoggedIn}
						/>
						{firstFilter ? (
							<SearchCollapsedTable
								startDate={startDate}
								endTime={endTime}
								setLoggedIn={setLoggedIn}
							/>
						) : null}
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default SearchDownloadPage;
