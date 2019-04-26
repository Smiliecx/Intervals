/* Timer Actions */
export const ADD_NEW_TIMER = "ADD_NEW_TIMER";
export const REMOVE_TIMER_BY_ID = "REMOVE_TIMER_BY_ID";
export const REMOVE_TIMER_BY_INDEX = "REMOVE_TIMER_BY_INDEX";
export const EDIT_TIMER_BY_ID = "EDIT_TIMER_BY_ID";
export const SET_TIMER_DURATION = "SET_TIMER_DURATION";
export const INCREMENT_TIMER_DURATION_BY_ID = "INCREMENT_TIMER_DURATION_BY_ID";
export const SET_LAST_TIMER_DATA = "SET_LAST_TIMER_DATA";
export const RESTART_TIMER_BY_ID = "RESTART_TIMER_BY_ID"
export const MOVE_TIMER_BY_ID = "MOVE_TIMER_BY_ID"
export const APPEND_INTERVAL= "APPEND_INTERVAL";
export const CLEAR_ALL_TIMERS= "CLEAR_ALL_TIMERS";

/* Timebank Actions */
export const ADD_NEW_TIMEBUCKET = "ADD_NEW_TIMEBUCKET";
export const EDIT_BUCKET_AMOUNT_BY_ID = "EDIT_BUCKET_AMOUNT_BY_ID";
export const EDIT_BUCKET_AMOUNT_BY_COLOR = "EDIT_BUCKET_AMOUNT_BY_COLOR";
export const INCREASE_BUCKET_AMOUNT_BY_COLOR =
    "INCREASE_BUCKET_AMOUNT_BY_COLOR";

/* Intervals Actions */
export const ADD_NEW_INTERVAL = "ADD_NEW_INTERVAL";
export const REMOVE_INTERVAL_BY_ID = "REMOVE_INTERVAL_BY_ID";


export function generateID() {
    return (
        "_" +
        Math.random()
            .toString(36)
            .substr(2, 9)
    );
}