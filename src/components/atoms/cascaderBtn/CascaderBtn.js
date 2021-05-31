import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import MyCascader from "../cascader/Cascader";

import "./style.less";

const CascaderWButton = (props) => {
	const {
		setLocationInfo,
		setLocationCodeInfo,
		setCamNameAdd,
		setLoadingNameAdd,
		setLoggedIn,
	} = props;
	const [selectedLocation, setSelectedLocation] = useState([]);
	const [selectedLocationCode, setSelectedLocationCode] = useState([]);
	const [locationChange, setLocationChange] = useState(false);
	const history = useHistory();
	const { pathname } = window.location;

	const handleSearch = () => {
		if (locationChange) {
			setLocationInfo(selectedLocation);
			setLocationCodeInfo(selectedLocationCode);
			if (pathname !== "/realtime/statistic") {
				history.push("/realtime/statistic");
			}
		} else {
			console.log("location didn't change or empty");
		}
	};

	return (
		<div className="cascader-with-button">
			<MyCascader
				size="large"
				displayLocation={false}
				setSelectedLocation={setSelectedLocation}
				setSelectedLocationCode={setSelectedLocationCode}
				setLocationChange={setLocationChange}
				setCamNameAdd={setCamNameAdd}
				setLoadingNameAdd={setLoadingNameAdd}
				setLoggedIn={setLoggedIn}
			/>
			<Button size="large" type="primary" onClick={handleSearch}>
				검색
			</Button>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		city: state.location.city,
		district: state.location.district,
		road: state.location.road,
		spot: state.location.spot,
		camera: state.location.camera,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		setLocationInfo: (selectedOption) => {
			dispatch(actions.setLocation(selectedOption));
		},
		setLocationCodeInfo: (selectedOptionCode) => {
			dispatch(actions.setLocationCode(selectedOptionCode));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CascaderWButton);
