import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Import thunk directly as named export
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
