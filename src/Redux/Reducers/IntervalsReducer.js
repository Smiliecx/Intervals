import * as ActionTypes from "../Actions/Types";

const initialState = {
    intervals: {}
};

export function IntervalsReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_INTERVAL:
            return {
                ...state,
                intervals: {
                    ...state.intervals,
                    [action.id]: {
                        name: action.name,
                        timers: [...action.timers]
                    }
                }
            };
        case ActionTypes.REMOVE_INTERVAL_BY_ID:
            let intervalsCopy = { ...state.intervals };
            delete intervalsCopy[action.id];
            return {
                ...state,
                intervals: intervalsCopy
            };
        default:
            return state;
    }
}
