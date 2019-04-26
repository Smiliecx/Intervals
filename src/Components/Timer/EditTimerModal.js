import React from "react";
import { connect } from "react-redux";
import { editTimerByID } from "../../Redux/Actions/TimerActions";
import { Modal, Button, Confirm, Input, Checkbox } from "semantic-ui-react";

class EditTimerModal extends React.Component {
    state = {
        intervalValue: "",
        bConfirmingDelete: false,
        autoFinish: false
    };

    handleChecked = () =>
        this.setState({
            autoFinish: !this.state.autoFinish
        });

    handleIntervalValueChange = (event) => {
        this.setState({
            intervalValue: event.target.value
        });
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

    finishEdit = () => {
        this.props.editTimerByID(this.props.timerID, {
            duration: parseInt(this.state.intervalValue),
            autoFinish: this.state.autoFinish
        });
    };

    render() {
        const { closeModal, removeTimer } = this.props;
        const { bConfirmingDelete, intervalValue } = this.state;

        return (
            <Modal open={true} size="small">
                <Modal.Header>Edit Timer</Modal.Header>
                <Modal.Content>
                    <Input
                        type="number"
                        icon="clock"
                        iconPosition="left"
                        placeholder="Interval Amount"
                        value={intervalValue}
                        onChange={this.handleIntervalValueChange}
                    />
                    <Checkbox
                        style={{ marginTop: 5 }}
                        onChange={this.handleChecked}
                        toggle
                        label="Auto-finish"
                        checked={this.state.autoFinish}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.confirmDelete} color="red">
                        Delete Timer
                    </Button>
                    <Button onClick={closeModal} color="red">
                        Cancel
                    </Button>
                    <Button onClick={this.finishEdit} color="green">
                        Submit
                    </Button>
                    <Confirm
                        size="small"
                        open={bConfirmingDelete}
                        onCancel={this.closeConfirmDelete}
                        onConfirm={removeTimer}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default connect(
    null,
    { editTimerByID }
)(EditTimerModal);
