import * as ActionTypes from "./Types";

function generateID() {
    return (
        "_" +
        Math.random()
            .toString(36)
            .substr(2, 9)
    );
}

export function addNewTimeBucket(bucketName, bucketColor) {
    return {
        type: ActionTypes.ADD_NEW_TIMEBUCKET,
        bucketObj: {
            id: generateID(),
            name: bucketName,
            color: bucketColor,
            amount: 0
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