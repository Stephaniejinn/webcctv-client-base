import { createStore } from "redux";
import reducers from "../reducers";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const storageConfig = {
	key: "root", // must have
	storage: storageSession, // session or local
	whitelist: ["location", "locationCode", "date"], // the only data in reducer that need to save, otherwise blacklist
};
const myPersistReducer = persistReducer(storageConfig, reducers);
const store = createStore(myPersistReducer);
export const persistor = persistStore(store, {}, () => {
	const state = store.getState();
	console.log(state);
});
// export const persistor = persistStore(store);
export default store;
