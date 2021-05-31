const initialState = {
	trafficURL: "/statistics/road-traffic",
	// baseURL: "http://192.168.1.100:3002/api",
	// baseURL: "http://globalbridge.iptime.org:3002/api",
	// overSpeedVideoURL: "https://globalbridge.synology.me:4000/api/streams",

	// baseURL: "http://210.104.181.221:3000/api",
	// overSpeedVideoURL: "http://210.104.181.220:4000/api/streams",

	baseURL: "http://210.104.181.200:3000/api",
	overSpeedVideoURL: "http://210.104.181.150:4000/api/streams",
};
export default function URL(state = initialState, action) {
	switch (action.type) {
		case "BASE_URL":
			return action.payload;
		default:
			return state;
	}
}
