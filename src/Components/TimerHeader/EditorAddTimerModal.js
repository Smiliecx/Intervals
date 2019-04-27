import React from "react";
import { connect } from "react-redux";
import {
    addNewTimer,
    setLastTimerData,
    editTimerByID
} from "../../Redux/Actions/TimerActions";
import {
    Modal,
    Input,
    Button,
    Dropdown,
    Checkbox,
    Confirm
} from "semantic-ui-react";

class AddTimerModal extends React.Component {
    state = {
        timerValue: (this.props.bIsEdit) ? this.props.timerData.startingDuration : this.props.lastTimerAmount,
        timerBucketName: (this.props.bIsEdit) ? this.props.timerData.timerBucketName : this.props.lastTimerBucketName,
        timerBucketColor: (this.props.bIsEdit) ? this.props.timerData.timerBucketColor : this.props.lastTimerColor,
        finishOption: (this.props.bIsEdit) ? this.props.timerData.finishOption : "Continue",
        autoStart: (this.props.bIsEdit) ? this.props.timerData.autoStart : true,
        bConfirmingDelete: false
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
            if (event.target.name === "timerValue") {
                if (event.target.value === "") return;
            }
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

    confirmDelete = () => {
        this.setState({
            bConfirmingDelete: true
        });
    };

    closeConfirmDelete = () => {
        this.setState({
            bConfirmingDelete: false
        });
    };

    editTimer = () => {
        this.props.editTimerByID(this.props.timerID, {
            duration: parseInt(this.state.timerValue),
            autoStart: this.state.autoStart,
            finishOption: this.state.finishOption,
            timerBucketName: this.state.lastTimerBucketName,
            timerBucketColor: this.state.timerBucketColor
        });
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
        //prettier-ignore
        const { timerValue, timerBucketName, timerBucketColor, finishOption, autoStart, bConfirmingDelete } = this.state;

        const { bIsEdit } = this.props;

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
                        name="finishOptions"
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
                    {bIsEdit && (
                        <Button onClick={this.confirmDelete} color="red">
                            Delete Timer
                        </Button>
                    )}
                    <Button
                        color="green"
                        onClick={bIsEdit ? this.editTimer : this.saveTimer}
                        disabled={!(this.isModalReadyForSubmit() || bIsEdit)}>
                        Submit
                    </Button>
                    <Button color="red" onClick={this.props.closeModal}>
                        Close
                    </Button>
                    {bIsEdit && (
                        <Confirm
                            size="small"
                            open={bConfirmingDelete}
                            onCancel={this.closeConfirmDelete}
                            onConfirm={this.props.removeTimer}
                        />
                    )}
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
    { addNewTimer, setLastTimerData, editTimerByID }
)(AddTimerModal);
