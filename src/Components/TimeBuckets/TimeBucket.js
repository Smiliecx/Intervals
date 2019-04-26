import React from "react";
import { connect } from "react-redux";
import {
    addNewTimeBucket,
    editBucketAmountByID
} from "../../Redux/Actions/TimeBucketActions";
import { distributeTimeBucket } from "../../Redux/Actions/TimerActions";
import { Icon, Menu } from "semantic-ui-react";
import { distributeAmountOverArray } from "../../Utils/Utils";

class TimeBucket extends React.Component {
    handleDistribute = () => {
        let clonedArray = this.props.timerList.map((timer) => {
            return { ...timer };
        });
        clonedArray = clonedArray.filter( (timer) => {
            console.log("TIMER: ", timer, " BUCKETDATA: ", this.props.bucketData);
            return timer.timerBucketColor === this.props.bucketData.color
        })
        const results = distributeAmountOverArray(this.props.bucketData.amount, clonedArray, "duration");

        this.props.distributeTimeBucket(this.props.bucketData.amount - results[1], this.props.bucketData.color);
    };

    render() {
        const { bucketData } = this.props;

        return (
            <span
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: 20
                }}>
                <Menu>
                    <Menu.Item onClick={this.handleDistribute} as="a">
                        <Icon
                            style={{ marginLeft: 5 }}
                            name="upload"
                            color={bucketData.color.toLowerCase()}
                        />
                        {bucketData.amount} in {bucketData.name}
                    </Menu.Item>
                </Menu>
            </span>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        buckets: state.TimerBuckets.buckets,
        timerList: state.Timers.timerList
    };
};

export default connect(
    mapStateToProps,
    { addNewTimeBucket, editBucketAmountByID, distributeTimeBucket }
)(TimeBucket);
