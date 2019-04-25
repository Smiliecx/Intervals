import * as ActionTypes from "./Types";

export const addNewInterval = (name, timers) => {
    return {
        type: ActionTypes.ADD_NEW_INTERVAL,
        id: ActionTypes.generateID(),
        name,
        timers
    };
};

export const removeIntervalByID = (id) => {
    console.log("remove: ", id);
    return {
        type: ActionTypes.REMOVE_INTERVAL_BY_ID,
        id
    }
}
