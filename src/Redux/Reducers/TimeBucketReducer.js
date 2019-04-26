import * as ActionTypes from "../Actions/Types";

const initialBucketState = {
    buckets: []
};

export function TimeBucketReducer(state = initialBucketState, action) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_TIMEBUCKET:
            const bFoundElement = state.buckets.find((bucket) => {
                return bucket.color === action.color;
            });
            if (bFoundElement !== undefined) return state;
            return {
                buckets: [...state.buckets, action.bucketObj]
            };
        case ActionTypes.EDIT_BUCKET_AMOUNT_BY_ID:
            return {
                buckets: state.buckets.map((bucket) => {
                    if (bucket.id === action.id) {
                        return {
                            ...bucket,
                            amount: action.amount
                        };
                    } else {
                        return bucket;
                    }
                })
            };
        case ActionTypes.EDIT_BUCKET_AMOUNT_BY_COLOR:
            return {
                buckets: state.buckets.map((bucket) => {
                    if (bucket.color === action.color) {
                        return {
                            ...bucket,
                            amount: action.amount
                        };
                    } else {
                        return bucket;
                    }
                })
            };
        case ActionTypes.INCREASE_BUCKET_AMOUNT_BY_COLOR:
            return {
                buckets: state.buckets.map((bucket) => {
                    if (bucket.color === action.color) {
                        return {
                            ...bucket,
                            amount: bucket.amount + action.amount
                        };
                    } else {
                        return bucket;
                    }
                })
            };
        case ActionTypes.DISTRIBUTE_TIME_BUCKET:
            return {
                ...state,
                buckets: state.buckets.map((bucket) => {
                    if (bucket.color === action.color) {
                        return {
                            ...bucket,
                            amount: bucket.amount - action.amount
                        };
                    } else {
                        return bucket;
                    }
                })
            };
        default:
            return state;
    }
}
