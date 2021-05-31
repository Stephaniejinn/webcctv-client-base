export const setUserInfo = (payload) => ({
	type: "USER_INFO_SET",
	payload,
});

export const setLocation = (payload) => ({
	type: "LOCATION_SET",
	payload,
});

export const setLocationCode = (payload) => ({
	type: "LOCATION_CODE_SET",
	payload,
});

export const setDayDate = (payload) => ({
	type: "DAY",
	payload,
});
export const setWeekDate = (payload) => ({
	type: "WEEK",
	payload,
});
export const setMonthDate = (payload) => ({
	type: "MONTH",
	payload,
});

export const setSearchDate = (payload) => ({
	type: "SEARCH",
	payload,
});
export const setOverSpeedDate = (payload) => ({
	type: "OVERSPEED",
	payload,
});

export const getLocation = () => ({
	type: "LOCATION_INFO",
	playload: "",
});

export const getLocationCode = () => ({
	type: "LOCATION_CODE_INFO",
	playload: "",
});

export const getURL = () => ({
	type: "BASE_URL",
	playload: "",
});
