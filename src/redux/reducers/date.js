const initialState = {
	dayStartDate: "",
	dayEndTime: "",
	weekStartDate: "",
	weekEndTime: "",
	monthStartDate: "",
	monthEndTime: "",
	searchStartDate: "",
	searchEndTime: "",
	overSpeedStartDate: "",
	overSpeedEndTime: "",
};
export default function date(state = initialState, action) {
	switch (action.type) {
		case "DAY":
			const { dayStartDate, dayEndTime } = action.payload;
			return {
				...state,
				dayStartDate,
				dayEndTime,
			};
		case "WEEK":
			const { weekStartDate, weekEndTime } = action.payload;
			return {
				...state,
				weekStartDate,
				weekEndTime,
			};
		case "MONTH":
			const { monthStartDate, monthEndTime } = action.payload;
			return {
				...state,
				monthStartDate,
				monthEndTime,
			};
		case "SEARCH":
			const { searchStartDate, searchEndTime } = action.payload;
			return {
				...state,
				searchStartDate,
				searchEndTime,
			};
		case "OVERSPEED":
			const { overSpeedStartDate, overSpeedEndTime } = action.payload;
			return {
				...state,
				overSpeedStartDate,
				overSpeedEndTime,
			};
		default:
			return state;
	}
}
