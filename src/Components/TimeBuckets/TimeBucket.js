import React from "react";
import { connect } from "react-redux";
import { addNewTimeBucket, editBucketAmountByID } from "../../Redux/Actions/TimeBucketActions";

class TimeBucket extends React.Component {
    componentDidMount() {
        this.props.addNewTimeBucket("TEST NAME", "Green");
        this.props.addNewTimeBucket("TEST NAME2", "Red");
    }
    render() {
        return <div>Test</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        buckets: state.TimerBuckets.buckets
    }
}

export default connect(
    mapStateToProps,
    { addNewTimeBucket , editBucketAmountByID}
)(TimeBucket);
