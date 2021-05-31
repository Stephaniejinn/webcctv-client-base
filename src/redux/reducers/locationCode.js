const initialState = {
	cityCode: "",
	districtCode: "",
	roadCode: "",
	spotCode: "",
	cameraCode: "",
	camAddress: "",
	camLanes: "",
};
export default function locationCode(state = initialState, action) {
	switch (action.type) {
		case "LOCATION_CODE_INFO":
			return action.payload;

		case "LOCATION_CODE_SET":
			const {
				cityCode,
				districtCode,
				roadCode,
				spotCode,
				cameraCode,
				camAddress,
				camLanes,
			} = action.payload;

			return {
				cityCode,
				districtCode,
				roadCode,
				spotCode,
				cameraCode,
				camAddress,
				camLanes,
			};
		default:
			return state;
	}
}
