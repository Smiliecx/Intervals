import * as ActionTypes from "../Actions/Types";

const initialBucketState = {
    buckets: []
};

export function TimeBucketReducer(state = initialBucketState, action) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_TIMEBUCKET:
            return {
                buckets: [...state.buckets, action.bucketObj]
            };
        default:
            return state;
    }
}
