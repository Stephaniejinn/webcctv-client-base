import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Layout, Menu, Divider, Typography } from "antd";
import { useHistory } from "react-router-dom";
import {
	FundProjectionScreenOutlined,
	FileTextOutlined,
	VideoCameraOutlined,
	BarChartOutlined,
	PicRightOutlined,
	FileSearchOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";

// import logo from "../../../assets/logo/logoBlackWN.png";
// import logoCollapsed from "../../../assets/logo/logoBlack.png";

import logo from "../../../assets/logo/originalLogo.png";
import logoCollapsed from "../../../assets/logo/originalLogoCollapsed.png";

import "./style.less";

const MySider = (props) => {
	const { cameraCode } = props;

	const { Sider } = Layout;
	const { SubMenu } = Menu;
	const { Text } = Typography;

	const { pathname: path } = window.location;
	const history = useHistory();

	const [siderCollapsed, setSiderCollapsed] = useState(false);
	const [openKeys, setOpenKeys] = useState(["statistic"]);

	// const [openKeys, setOpenKeys] = useState(() => {
	// 	if (
	// 		path === "/statistic/day" ||
	// 		path === "/statistic/week" ||
	// 		path === "/statistic/month"
	// 	) {
	// 		return ["statistic"];
	// 	} else {
	// 		return [];
	// 	}
	// });

	const handleClick = (e) => {
		if (cameraCode.length === 0) {
			window.alert("위치설정 해주세요");
			e.preventDefault();

			history.push("/realtime/streaming");
		}
	};
	const onCollapse = (collapsed) => {
		setSiderCollapsed(collapsed);
	};

	const onOpenChange = (keys) => {
		setOpenKeys(keys);
	};

	return (
		<Sider
			collapsible
			collapsed={siderCollapsed}
			onCollapse={onCollapse}
			theme="light"
			width="240"
			style={{ paddingLeft: 15, paddingRight: 7 }}
		>
			<div className="logo-position">
				{siderCollapsed ? (
					<img
						src={logoCollapsed}
						className="logo-collapsed"
						alt="logo collapsed"
					/>
				) : (
					<>
						<img src={logo} className="logo" alt="logo" />
						<Divider type="vertical" />
						<Text strong type="secondary">
							대시보드
						</Text>
					</>
				)}
			</div>
			<div className="sider-divider">
				<Divider />
			</div>
			<Menu
				theme="light"
				mode="inline"
				defaultSelectedKeys={["/realtime/streaming"]}
				selectedKeys={path}
				openKeys={openKeys}
				defaultOpenKeys={["statistic"]}
				onOpenChange={onOpenChange}
			>
				<Menu.Item key="/realtime/streaming" icon={<VideoCameraOutlined />}>
					<Link to="/realtime/streaming">실시간 영상</Link>
				</Menu.Item>
				<Menu.Item
					key="/realtime/statistic"
					icon={<FundProjectionScreenOutlined />}
				>
					<Link onClick={handleClick} to="/realtime/statistic">
						실시간 데이터
					</Link>
				</Menu.Item>
				<SubMenu
					key="statistic"
					icon={<BarChartOutlined />}
					title="누적 통계 데이터 분석"
				>
					<Menu.Item key="/statistic/day" icon={<PicRightOutlined />}>
						<Link to="/statistic/day">일간 별</Link>
					</Menu.Item>
					<Menu.Item key="/statistic/week" icon={<PicRightOutlined />}>
						<Link to="/statistic/week">주간 별</Link>
					</Menu.Item>
					<Menu.Item key="/statistic/month" icon={<PicRightOutlined />}>
						<Link to="/statistic/month">월간 별</Link>
					</Menu.Item>
				</SubMenu>
				<Menu.Item key="/overspeed" icon={<FileSearchOutlined />}>
					<Link to="/overspeed">과속 데이터 조회</Link>
				</Menu.Item>
				<Menu.Item key="/search" icon={<FileTextOutlined />}>
					<Link to="/search">데이터 조회 및 다운로드</Link>
				</Menu.Item>
				{/* <Menu.Item key="/comparison" icon={<PieChartOutlined />}>
					<Link to="/comparison">통계 비교</Link>
				</Menu.Item> */}
			</Menu>
		</Sider>
	);
};

const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
	};
};

export default connect(mapStateToProps)(MySider);
