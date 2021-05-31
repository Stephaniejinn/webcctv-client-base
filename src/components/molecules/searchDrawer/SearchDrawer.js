import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { AimOutlined } from "@ant-design/icons";

import SearchInput from "../../atoms/cascaderBtn/CascaderBtn";

import "./style.less";

const SearchDrawer = (props) => {
	const { setLoggedIn } = props;
	const [drawerVisible, setDrawerVisible] = useState(false);

	const showDrawer = () => {
		setDrawerVisible(true);
	};
	const onClose = () => {
		setDrawerVisible(false);
	};
	return (
		<div className="my-drawer">
			<div className="site-drawer-render-in-current-wrapper">
				<Button
					type="primary"
					icon={<AimOutlined />}
					size="large"
					onClick={showDrawer}
				/>
				<Drawer
					placement="right"
					maskStyle={{ backgroundColor: "transparent" }}
					closable={false}
					onClose={onClose}
					visible={drawerVisible}
					getContainer={false}
					style={{ position: "absolute" }}
				>
					<SearchInput setLoggedIn={setLoggedIn} />
				</Drawer>
			</div>
		</div>
	);
};

export default SearchDrawer;
