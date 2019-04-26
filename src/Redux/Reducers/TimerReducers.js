import * as ActionTypes from "../Actions/Types";
import {distributeAmountOverArray} from "../../Utils/Utils";

const intitialTimerState = {
    timerList: [],
    lastTimerAmount: 0,
    lastTimerColor: "Red",
    lastTimerBucketName: "Default"
};

export function TimerReducer(state = intitialTimerState, action) {
    switch (action.type) {
        case ActionTypes.INCREMENT_TIMER_DURATION_BY_ID:
            return {
                ...state,
                timerList: state.timerList.map((timer) => {
                    if (timer.id === action.id) {
                        return {
                            ...timer,
                            duration: timer.duration + action.duration
                        };
                    } else {
                        return timer;
                    }
                })
            };
        case ActionTypes.ADD_NEW_TIMER:
            return {
                ...state,
                timerList: [...state.timerList, action.timerObj]
            };
        case ActionTypes.REMOVE_TIMER_BY_ID:
            return {
                ...state,
                timerList: state.timerList.filter((timer) => {
                    return timer.id !== action.id;
                })
            };
        case ActionTypes.REMOVE_TIMER_BY_INDEX:
            return {
                ...state,
                timerList: state.timerList.filter((timer, index) => {
                    return index !== action.index;
                })
            };
        case ActionTypes.EDIT_TIMER_BY_ID:
            return {
                ...state,
                timerList: state.timerList.map((timer) => {
                    if (timer.id !== action.id) {
                        return timer;
                    } else {
                        return {
                            ...timer,
                            ...action.timerObj
                        };
                    }
                })
            };
        case ActionTypes.EDIT_TIMER_BY_INDEX:
            return {
                ...state,
                timerList: state.timerList.map((timer, index) => {
                    if (index !== action.index) {
                        return timer;
                    } else {
                        return { ...timer, ...action.timerObj };
                    }
                })
            };
        case ActionTypes.SET_TIMER_DURATION:
            return {
                ...state,
                timerList: state.timerList.map((timer) => {
                    if (timer.id !== action.id) {
                        return timer;
                    } else {
                        return {
                            ...timer,
                            duration: action.duration
                        };
                    }
                })
            };
        case ActionTypes.SET_LAST_TIMER_DATA:
            return {
                ...state,
                lastTimerAmount: action.amount,
                lastTimerBucketName: action.bucketName,
                lastTimerColor: action.bucketColor
            };
        case ActionTypes.RESTART_TIMER_BY_ID:
            return {
                ...state,
                timerList: state.timerList.map((timer) => {
                    if (timer.id === action.id) {
                        return { ...timer, duration: timer.startingDuration };
                    } else {
                        return timer;
                    }
                })
            };
        case ActionTypes.MOVE_TIMER_BY_ID:
            const timerIndexToMove = state.timerList.findIndex((timer) => {
                return timer.id === action.id;
            });

            const newIndex = timerIndexToMove + action.direction;
            if (newIndex < 0 || newIndex >= state.timerList.length)
                return state;

            let copiedArray = state.timerList.slice();
            [copiedArray[timerIndexToMove], copiedArray[newIndex]] = [
                copiedArray[newIndex],
                copiedArray[timerIndexToMove]
            ];
            return {
                ...state,
                timerList: copiedArray
            };
        case ActionTypes.APPEND_INTERVAL:
            return {
                ...state,
                timerList: state.timerList.concat(action.timersToAppend)
            };
        case ActionTypes.CLEAR_ALL_TIMERS:
            return {
                ...state,
                timerList: []
            };
        case ActionTypes.MOVE_FRONT_TO_BACK:
            let newTimerList = [
                ...state.timerList.splice(1, state.timerList.length),
                state.timerList[0]
            ];
            newTimerList[newTimerList.length - 1].duration =
                newTimerList[newTimerList.length - 1].startingDuration;
            newTimerList[0].forceStart = true;
            return {
                ...state,
                timerList: newTimerList
            };
        case ActionTypes.DISTRIBUTE_TIME_BUCKET:
            console.log("REDUCER");
            const clonedArray = state.timerList.map((timer) => {
                return {
                    ...timer
                };
            });
            const filteredArray = clonedArray.filter((timer) => {
                return timer.timerBucketColor === action.color;
            });

            distributeAmountOverArray(action.amount, filteredArray, "duration");

            return {
                ...state,
                timerList: clonedArray
            };
        default:
            return state;
    }
}
