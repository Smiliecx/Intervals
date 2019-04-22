import * as ActionTypes from "./Types";

function generateID() {
    return (
        "_" +
        Math.random()
            .toString(36)
            .substr(2, 9)
    );
}

//  TimerPayload = {
//      id: number,
//     duration: number
//  }
export const addNewTimer = (timerObj) => {
    timerObj.id = generateID();
    return {
        type: ActionTypes.ADD_NEW_TIMER,
        timerObj
    };
};

export const removeTimerByID = (id) => {
    return {
        type: ActionTypes.REMOVE_TIMER_BY_ID,
        id
    };
};

export const removeTimerByIndex = (index) => {
    return {
        type: ActionTypes.REMOVE_TIMER_BY_INDEX,
        index
    }
}

export const editTimerByID = (id, timerObj) => {
    return {
        type: ActionTypes.EDIT_TIMER_BY_ID,
        id,
        timerObj
    }
}

export const editTimerByIndex = (index, timerObj) => {
    return {
        type: ActionTypes.EDIT_TIMER_BY_INDEX,
        index,
        timerObj
    }
}