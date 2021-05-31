import { combineReducers } from "redux";
import location from "./location";
import userInfo from "./userInfo";
import locationCode from "./locationCode";
import baseURL from "./baseURL";
import date from "./date";
export default combineReducers({
	location,
	locationCode,
	userInfo,
	baseURL,
	date,
});
