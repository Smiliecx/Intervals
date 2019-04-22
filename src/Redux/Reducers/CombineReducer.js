import { combineReducers } from "redux";
import * as TimerReducers from "./TimerReducers";

const rootReducer = combineReducers({
  Timers: TimerReducers.TimerReducer
});

export default rootReducer;
