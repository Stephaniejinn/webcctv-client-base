const initialState = {
	city: "",
	district: "",
	road: "",
	spot: "",
	camera: "",
};
export default function location(state = initialState, action) {
	switch (action.type) {
		case "LOCATION_INFO":
			return action.payload;
		case "LOCATION_SET":
			const { city, district, road, spot, camera } = action.payload;
			return {
				city,
				district,
				road,
				spot,
				camera,
			};
		default:
			return state;
	}
}
