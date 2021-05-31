import React from "react";
import { Card, Typography } from "antd";

const GeneralGraphCard = ({ title, chart }) => {
	const { Text } = Typography;
	return (
		<>
			{chart ? (
				<Card title={title}>{chart}</Card>
			) : (
				<Card title={title}>
					<div
						style={{
							marginTop: 20,
							marginBottom: 20,
							textAlign: "center",
							paddingTop: 30,
							paddingBottom: 30,
						}}
					>
						<Text>현재 해당 카메라 데이터가 없습니다</Text>
					</div>
				</Card>
			)}
		</>
	);
};
export default GeneralGraphCard;
