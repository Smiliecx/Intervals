import React from "react";
import { connect } from "react-redux";
import {
    addNewTimeBucket,
    editBucketAmountByID
} from "../../Redux/Actions/TimeBucketActions";
import { Icon, Menu } from "semantic-ui-react";

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
                <Menu>
                    <Menu.Item as="a">
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
        buckets: state.TimerBuckets.buckets
    };
};

export default connect(
    mapStateToProps,
    { addNewTimeBucket, editBucketAmountByID }
)(TimeBucket);
