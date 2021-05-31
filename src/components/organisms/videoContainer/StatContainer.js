import React from "react";
import { Card } from "antd";

import Video from "../../molecules/video/Video";

import "./style.less";

const StatContainer = ({ httpAddress }) => {
	return (
		<div className="video-container">
			<div className="video-container-streamming">
				<Card>{httpAddress && <Video source={httpAddress} />}</Card>
			</div>
		</div>
	);
};

export default StatContainer;
