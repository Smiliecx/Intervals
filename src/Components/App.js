import React from "react";
import {
    addNewTimer,
    removeTimerByID,
    removeTimerByIndex,
    editTimerByID,
    editTimerByIndex
} from "../Redux/Actions/TimerActions";
import { connect } from "react-redux";
import { Segment, Button, Input } from "semantic-ui-react";

class App extends React.Component {
    state = {
        inputText: ""
    };

    addTimer = () => {
        if (this.state.inputText.length === 0) return;
        this.props.addNewTimer({
            duration: parseInt(this.state.inputText)
        });
    };

    removeTimerByID = () => {
        if (this.state.inputText.length === 0) return;
        this.props.removeTimerByID(this.props.state.Timers.timerList[0].id);
    };

    removeTimerByIndex = () => {
        if (this.state.inputText.length === 0) return;
        this.props.removeTimerByIndex(parseInt(this.state.inputText));
    };

    handleChangeText = (event) => {
        this.setState({
            inputText: event.target.value
        });
    };

    editTimerByIndex = () => {
        if (this.state.inputText.length === 0) return;
        this.props.editTimerByIndex(parseInt(this.state.inputText), {
            duration: parseInt(this.state.inputText)
        });
    };

    editTimerByID = () => {
        if (this.state.inputText.length === 0) return;
        this.props.editTimerByID(this.props.state.Timers.timerList[0].id, {
            duration: parseInt(this.state.inputText)
        });
    };

    render() {
        return (
            <Segment>
                <Input
                    type="number"
                    value={this.state.inputText}
                    onChange={this.handleChangeText}
                />
                <Button color="green" onClick={this.addTimer}>
                    Add Timer
                </Button>
                <Button color="red" onClick={this.removeTimerByID}>
                    Remove ID
                </Button>
                <Button color="red" onClick={this.removeTimerByIndex}>
                    Remove Index
                </Button>
                <Button onClick={this.editTimerByID}>Edit by ID</Button>
                <Button onClick={this.editTimerByIndex}>Edit by INdex</Button>
            </Segment>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state
    };
}

export default connect(
    mapStateToProps,
    {
        addNewTimer,
        removeTimerByID,
        removeTimerByIndex,
        editTimerByID,
        editTimerByIndex
    }
)(App);
