import React from "react";
import { connect } from "react-redux";
import { addNewTimer } from "../../Redux/Actions/TimerActions";
import { Modal, Input, Button } from "semantic-ui-react";

class AddTimerModal extends React.Component {
    state = {
        intervalValue: ""
    };

    handleIntervalValueChange = (event) => {
        this.setState({
            intervalValue: event.target.value
        });
    };

    saveInterval = () => {
        this.props.addNewTimer(parseInt(this.state.intervalValue));
    };

    isModalReadyForSubmit = () => {
        return !this.state.intervalValue.length > 0;
    };

    render() {
        const { intervalValue } = this.state;

        return (
            <Modal open={true} size="small">
                <Modal.Header as="h1">Add a new Interval</Modal.Header>

                <Modal.Content>
                    <Input
                        type="number"
                        icon="clock"
                        iconPosition="left"
                        placeholder="Interval Amount"
                        value={intervalValue}
                        onChange={this.handleIntervalValueChange}
                    />
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        color="green"
                        onClick={this.saveInterval}
                        disabled={this.isModalReadyForSubmit()}>
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

export default connect(null, {addNewTimer})(AddTimerModal);
