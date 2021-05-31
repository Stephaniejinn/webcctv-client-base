const initialState = {
	username: "master",
	affiliation: "글로벌브릿지",
	permission: [],
	isloggedIn: false,
};
export default function userInfo(state = initialState, action) {
	switch (action.type) {
		case "USER_INFO_SET":
			const { username, affiliation, permission, isloggedIn } = action.payload;
			return {
				...state,
				username,
				affiliation,
				permission,
				isloggedIn,
			};
		default:
			return state;
	}
}
