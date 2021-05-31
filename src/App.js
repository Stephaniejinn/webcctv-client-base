import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Spin, message } from "antd";
import { connect } from "react-redux";
import axios from "axios";

import RealtimeStreamingPage from "./components/pages/realtimeStreaming/RealtimeStreamingPage";
import RealtimeStatisticPage from "./components/pages/realtimeStatistic/RealtimeStatisticPage";
import DayStatPage from "./components/pages/statisticAnalysis/DayStatPage";
import WeekStatPage from "./components/pages/statisticAnalysis/WeekStatPage";
import MonthStatPage from "./components/pages/statisticAnalysis/MonthStatPage";
import SearchDownloadPage from "./components/pages/search/SearchPage";
import SearchOverSpeed from "./components/pages/search/OverspeedPage";
import PasswordPage from "./components/pages/account/PasswordPage";
import SignupPage from "./components/pages/account/SignupPage";
import LoginPage from "./components/pages/login/LoginPage";
// import DataComparisonPage from "./components/pages/dataComparison/DataComparisonPage";

const App = (props) => {
	const { baseURL } = props;
	const [loggedIn, setLoggedIn] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [isMaster, setMaster] = useState(false);

	useEffect(() => {
		loginStatus();
	}, [localStorage.getItem("username")]);

	const loginStatus = () => {
		axios
			.get(`${baseURL}/users/${localStorage.getItem("username")}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				let master = res.data.isMaster;
				if (master) {
					setMaster(true);
				} else {
					setMaster(false);
				}
				setLoggedIn(true);
				setLoading(false);
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 401) {
						if (localStorage.getItem("username")) {
							message.warning("로그아웃 되었습니다");
						}
					}
				} else {
					message.error("Network Error");
				}
				setLoading(false);
			});
	};
	return (
		<>
			{isLoading ? (
				<div
					style={{
						marginTop: 20,
						marginBottom: 20,
						textAlign: "center",
						paddingTop: 30,
						paddingBottom: 30,
					}}
				>
					<Spin size="large" />
				</div>
			) : (
				<BrowserRouter>
					{loggedIn ? (
						<Switch>
							{/* <Route path="/login" render={() => <LoginPage />} /> */}
							<Route
								exact
								path="/realtime/streaming"
								render={() => (
									<RealtimeStreamingPage
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
									/>
								)}
							/>
							<Route
								path="/realtime/statistic"
								render={() => (
									<RealtimeStatisticPage
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
									/>
								)}
							/>
							<Route
								path="/statistic/day"
								render={() => (
									<DayStatPage setLoggedIn={setLoggedIn} isMaster={isMaster} />
								)}
							/>
							<Route
								path="/statistic/week"
								render={() => (
									<WeekStatPage setLoggedIn={setLoggedIn} isMaster={isMaster} />
								)}
							/>
							<Route
								path="/statistic/month"
								render={() => (
									<MonthStatPage
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
									/>
								)}
							/>
							<Route
								path="/search"
								render={() => (
									<SearchDownloadPage
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
									/>
								)}
							/>
							<Route
								path="/overspeed"
								render={() => (
									<SearchOverSpeed
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
									/>
								)}
							/>
							<Route
								path="/password"
								render={() => (
									<PasswordPage setLoggedIn={setLoggedIn} isMaster={isMaster} />
								)}
							/>
							<Route
								path="/signup"
								render={() => (
									<SignupPage setLoggedIn={setLoggedIn} isMaster={isMaster} />
								)}
							/>
							<Redirect path="*" to="/realtime/streaming" />
							{/* <Route
						path="/comparison"
						render={() => <DataComparisonPage setLoggedIn={setLoggedIn} />}
					/> */}
						</Switch>
					) : (
						<Switch>
							<Route
								path="*"
								render={() => <LoginPage setLoggedIn={setLoggedIn} />}
							/>
						</Switch>
					)}
				</BrowserRouter>
			)}
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		baseURL: state.baseURL.baseURL,
	};
};

export default connect(mapStateToProps)(App);
