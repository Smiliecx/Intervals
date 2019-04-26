import React from "react";
import { connect } from "react-redux";
import {
    addNewTimer,
    setLastTimerData
} from "../../Redux/Actions/TimerActions";
import { Modal, Input, Button, Dropdown, Checkbox } from "semantic-ui-react";

class AddTimerModal extends React.Component {
    state = {
        timerValue: this.props.lastTimerAmount,
        timerBucketName: this.props.lastTimerBucketName,
        timerBucketColor: this.props.lastTimerColor,
        finishOption: "Continue",
        autoStart: true
    };

    dropDownOptions = [
        { key: "Red", value: "Red", text: "Red" },
        { key: "Blue", value: "Blue", text: "Blue" },
        { key: "Green", value: "Green", text: "Green" },
        { key: "Orange", value: "Orange", text: "Orange" },
        { key: "Yellow", value: "Yellow", text: "Yellow" }
    ];

    finishOptions = [
        { key: "Continue", value: "Continue", text: "To Bucket on Finish" },
        { key: "GotoEnd", value: "GotoEnd", text: "Goto End on Finish" },
        { key: "Delete", value: "Delete", text: "Delete Timer on Finish" }
    ];

    handleValueChange = (event, { name, value }) => {
        if (event.target.value !== undefined) {
            this.setState(
                {
                    [event.target.name]: event.target.value
                },
                this.setTimerDataOnStore
            );
        } else if (value !== undefined) {
            this.setState(
                {
                    [name]: value
                },
                this.setTimerDataOnStore
            );
        } else {
            this.setState({
                [name]: !this.state[name]
            });
        }
    };

    handleFinishValueChange = (event, { value }) => {
        this.setState({
            finishOption: value
        });
    };

    setTimerDataOnStore = () => {
        const timerAmount = Math.max(parseInt(this.state.timerValue), 0);
        this.props.setLastTimerData(
            timerAmount,
            this.state.timerBucketName,
            this.state.timerBucketColor
        );
    };

    saveTimer = () => {
        this.props.addNewTimer(
            parseInt(this.state.timerValue),
            this.state.timerBucketName,
            this.state.timerBucketColor,
            this.state.finishOption,
            this.state.autoStart
        );
    };

    isModalReadyForSubmit = () => {
        return (
            this.state.timerValue.length > 0 &&
            this.state.timerBucketColor.length > 0 &&
            this.state.timerBucketName.length > 0
        );
    };

    render() {
        const {
            timerValue,
            timerBucketName,
            timerBucketColor,
            finishOption,
            autoStart
        } = this.state;

        return (
            <Modal open={true} size="small">
                <Modal.Header as="h1">Add a new Interval</Modal.Header>

                <Modal.Content>
                    <Input
                        name="timerValue"
                        type="number"
                        icon="clock"
                        iconPosition="left"
                        placeholder="Interval Amount"
                        error={timerValue.length === 0}
                        value={timerValue}
                        onChange={this.handleValueChange}
                    />
                    <Input
                        name="timerBucketName"
                        type="text"
                        icon="edit"
                        error={timerBucketName.length === 0}
                        iconPosition="left"
                        placeholder="Time Bucket Name"
                        value={timerBucketName}
                        onChange={this.handleValueChange}
                    />
                    <Dropdown
                        name="timerBucketColor"
                        selection
                        placeholder="Select a Time Group"
                        options={this.dropDownOptions}
                        onChange={this.handleValueChange}
                        error={timerBucketColor.length === 0}
                        value={timerBucketColor}
                    />
                    <Dropdown
                        name="timerBucketColor"
                        selection
                        placeholder="Select a Time Group"
                        options={this.finishOptions}
                        onChange={this.handleFinishValueChange}
                        value={finishOption}
                    />
                    <Checkbox
                        name="autoStart"
                        onChange={this.handleValueChange}
                        label="Start Automatically"
                        checked={autoStart}
                    />
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        color="green"
                        onClick={this.saveTimer}
                        disabled={!this.isModalReadyForSubmit()}>
                        Submit
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
        lastTimerAmount: state.Timers.lastTimerAmount,
        lastTimerColor: state.Timers.lastTimerColor,
        lastTimerBucketName: state.Timers.lastTimerBucketName
    };
}

export default connect(
    mapStateToProps,
    { addNewTimer, setLastTimerData }
)(AddTimerModal);
