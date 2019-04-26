import * as ActionTypes from "./Types";

export function addNewTimeBucket(bucketName, bucketColor) {
    return {
        type: ActionTypes.ADD_NEW_TIMEBUCKET,
        bucketObj: {
            id: ActionTypes.generateID(),
            name: bucketName,
            color: bucketColor,
            amount: 50
        }
    };
}

export function editBucketAmountByID(bucketID, amount) {
    return {
        type: ActionTypes.EDIT_BUCKET_AMOUNT_BY_ID,
        id: bucketID,
        amount
    };
}

export function editBucketAmountByColor(bucketColor, amount) {
    return {
        type: ActionTypes.EDIT_BUCKET_AMOUNT_BY_COLOR,
        color: bucketColor,
        amount
    };
}

export function increaseBucketAmountByColor(bucketColor, amount) {
    return {
        type: ActionTypes.INCREASE_BUCKET_AMOUNT_BY_COLOR,
        color: bucketColor,
        amount
    }
}