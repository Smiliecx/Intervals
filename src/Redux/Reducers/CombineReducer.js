import { combineReducers } from "redux";
import * as TimerReducers from "./TimerReducers";
import * as TimeBuckets from "./TimeBucketReducer";

const rootReducer = combineReducers({
  Timers: TimerReducers.TimerReducer,
  TimerBuckets: TimeBuckets.TimeBucketReducer
});

export default rootReducer;
