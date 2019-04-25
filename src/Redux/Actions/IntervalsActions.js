import * as ActionTypes from "./Types";

export const addNewInterval = (name, timers) => {
    return {
        type: ActionTypes.ADD_NEW_INTERVAL,
        id: ActionTypes.generateID(),
        name,
        timers
    };
};
