import { combineReducers } from "redux";
import * as TimerReducers from "./TimerReducers";
import * as TimeBuckets from "./TimeBucketReducer";
import * as IntervalsReducer from "./IntervalsReducer";

const rootReducer = combineReducers({
  Timers: TimerReducers.TimerReducer,
  TimerBuckets: TimeBuckets.TimeBucketReducer,
  Intervals: IntervalsReducer.IntervalsReducer
});

export default rootReducer;
