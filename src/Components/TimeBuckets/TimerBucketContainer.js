import React from "react";
import { connect } from "react-redux";
import { addNewTimeBucket } from "../../Redux/Actions/TimeBucketActions";

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
        return <div>TimerBucketCOntainer</div>;
    }
}

export default connect(
    null,
    { addNewTimeBucket }
)(TimerBucketContainer);
