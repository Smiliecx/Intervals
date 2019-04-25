import React from "react";
import { connect } from "react-redux";
import {
    addNewTimeBucket,
    editBucketAmountByID
} from "../../Redux/Actions/TimeBucketActions";
import { Icon } from "semantic-ui-react";

class TimeBucket extends React.Component {
    render() {
        const { bucketData } = this.props;

        return (
            <span
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: 20
                }}>
                <span>
                    <Icon
                        style={{ alignSelf: "center" }}
                        name="circle"
                        size="small"
                        color={bucketData.color.toLowerCase()}
                    />
                    {bucketData.name}
                    <Icon
                        style={{ marginLeft: 5 }}
                        link
                        name="upload"
                        color={bucketData.color.toLowerCase()}
                    />
                </span>

                <span style={{ alignSelf: "center" }}>{bucketData.amount}</span>
            </span>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        buckets: state.TimerBuckets.buckets
    };
};

export default connect(
    mapStateToProps,
    { addNewTimeBucket, editBucketAmountByID }
)(TimeBucket);
