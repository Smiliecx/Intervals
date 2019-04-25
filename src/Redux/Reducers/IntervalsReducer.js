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
        default:
            return state;
    }
}
