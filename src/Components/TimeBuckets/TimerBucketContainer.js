import React from "react";
import { connect } from "react-redux";
import { addNewTimeBucket } from "../../Redux/Actions/TimeBucketActions";
import { Segment } from "semantic-ui-react";
import TimeBucket from "./TimeBucket";

class TimerBucketContainer extends React.Component {
    state = {
        activeBucketGroups: ["Red", "Green", "Yellow", "Blue", "Orange"]
    };

    componentDidMount() {
        this.state.activeBucketGroups.forEach((bucketGroup) => {
            this.props.addNewTimeBucket(bucketGroup, bucketGroup);
        });
    }

    render() {
        const { timeBuckets } = this.props;

        return (
            <Segment raised>
                <span style={{display: "flex"}}>
                    {timeBuckets.map((bucket) => {
                        return <TimeBucket key={bucket.id} bucketData={bucket}/>;
                    })}
                </span>
            </Segment>
        );
    }
}

function mapStateToProps(state) {
    return {
        timeBuckets: state.TimerBuckets.buckets
    };
}

export default connect(
    mapStateToProps,
    { addNewTimeBucket }
)(TimerBucketContainer);
