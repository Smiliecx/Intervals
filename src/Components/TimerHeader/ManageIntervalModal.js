import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Input } from "semantic-ui-react";
import { addNewInterval } from "../../Redux/Actions/IntervalsActions";

class ManageIntervalModal extends React.Component {
    state = {
        intervalName: "Default",
        errorMessage: ""
    };

    handleValueChange = (event) => {
        this.setState({
            intervalName: event.target.value,
            errorMessage: ""
        });
    };

    addNewInterval = () => {
        const {intervalName} = this.state;
        if (!this.isFormValid()) return;
        this.setState({
            intervalName: ""
        });
        this.props.addNewInterval(intervalName, this.props.timers);
    };

    doesIntervalsContainIntervalName = () => {
        const { intervals } = this.props;

        const entries = Object.entries(intervals);
        const bIsValid = !entries.some((entry) => {
            return entry[1].name === this.state.intervalName;
        });

        if (!bIsValid) {
            this.setState({
                errorMessage: "This interval name has already been used."
            });
        }
        return bIsValid;
    };

    isIntervalNameValid = () => {
        const bIsValid = this.state.intervalName.length > 0;
        if (!bIsValid) {
            this.setState({
                errorMessage: "Interval name must be filled in."
            });
        }
        return bIsValid;
    };

    isFormValid = () => {
        const bIsValid =
            this.doesIntervalsContainIntervalName() &&
            this.isIntervalNameValid();

        if (bIsValid) {
            this.setState({
                errorMessage: ""
            });
        }

        return bIsValid;
    };

    render() {
        const { intervalName, errorMessage } = this.state;

        return (
            <Modal open={true}>
                <Modal.Header>Manage Intervals</Modal.Header>
                <Modal.Content>
                    <Input
                        type="text"
                        icon="edit"
                        error={errorMessage.length !== 0}
                        iconPosition="left"
                        placeholder="Interval Name"
                        value={intervalName}
                        onChange={this.handleValueChange}
                    />

                    <h3 style={{ display: "inline", marginLeft: 20 }}>
                        {this.props.timers.length} Timers in Interval
                    </h3>
                    <h4 style={{ marginTop: 5, color: "red" }}>
                        {errorMessage}
                    </h4>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        disabled={errorMessage.length !== 0}
                        color="green"
                        onClick={this.addNewInterval}>
                        Save Interval
                    </Button>
                    <Button color="red" onClick={this.props.closeModal}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        timers: state.Timers.timerList,
        intervals: state.Intervals.intervals
    };
}

export default connect(
    mapStateToProps,
    { addNewInterval }
)(ManageIntervalModal);
