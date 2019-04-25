import * as ActionTypes from "./Types";

//  TimerPayload = {
//      id: number,
//     duration: number
//  }
export const addNewTimer = (duration, timerBucketName, timerBucketColor) => {
    return {
        type: ActionTypes.ADD_NEW_TIMER,
        timerObj: {
            id: ActionTypes.generateID(),
            duration,
            startingDuration: duration,
            timerBucketName,
            timerBucketColor
        }
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
    };
};

export const editTimerByID = (id, timerObj) => {
    if (timerObj.duration) {
        timerObj.startingDuration = timerObj.duration;
    }
    return {
        type: ActionTypes.EDIT_TIMER_BY_ID,
        id,
        timerObj
    };
};

export const editTimerByIndex = (index, timerObj) => {
    if (timerObj.duration) {
        timerObj.startingDuration = timerObj.duration;
    }
    return {
        type: ActionTypes.EDIT_TIMER_BY_INDEX,
        index,
        timerObj
    };
};

export const setTimerDuration = (id, duration) => {
    return {
        type: ActionTypes.SET_TIMER_DURATION,
        id,
        duration
    };
};

export const incrementTimerDurationByID = (id, duration) => {
    return {
        type: ActionTypes.INCREMENT_TIMER_DURATION_BY_ID,
        id,
        duration
    };
};

export const setLastTimerData = (amount, bucketName, bucketColor) => {
    return {
        type: ActionTypes.SET_LAST_TIMER_DATA,
        amount,
        bucketName,
        bucketColor
    };
};

export const restartTimerByID = (id) => {
    return {
        type: ActionTypes.RESTART_TIMER_BY_ID,
        id
    };
};

export const moveTimerByID = (id, direction) => {
    if (direction <= 0){
        direction = -1;
    }else {
        direction = 1;
    }
    
    return {
        type: ActionTypes.MOVE_TIMER_BY_ID,
        id,
        direction
    }
}
