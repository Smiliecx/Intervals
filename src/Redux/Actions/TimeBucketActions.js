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
            bucketName,
            bucketColor,
            bucketAmount: 0
        }
    };
}
