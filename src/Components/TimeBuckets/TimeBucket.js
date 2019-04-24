import React from "react";
import { connect } from "react-redux";
import { addNewTimeBucket } from "../../Redux/Actions/TimeBucketActions";

class TimeBucket extends React.Component {
    componentDidMount() {
        console.log("ADD BUCKET");
        this.props.addNewTimeBucket("TEST NAME", "Green");
        this.props.addNewTimeBucket("TEST NAME2", "Red");
    }
    render() {
        return <div>Test</div>;
    }
}

export default connect(
    null,
    { addNewTimeBucket }
)(TimeBucket);
