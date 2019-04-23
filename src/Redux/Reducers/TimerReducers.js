import * as ActionTypes from "../Actions/Types";

const intitialTimerState = {
    timerList: []
};

export function TimerReducer(state = intitialTimerState, action) {
    switch (action.type) {
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
                        return { ...timer, ...action.timerObj };
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
                        }
                    }
                })
            }
        default:
            return state;
    }
}
