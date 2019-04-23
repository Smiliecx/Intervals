import React from "react";
import { connect } from "react-redux";
import { Card, Icon } from "semantic-ui-react";
import { setTimerDuration, removeTimerByID } from "../../Redux/Actions/TimerActions";
import moment from "moment"

class Timer extends React.Component {
    state = {
        invervalID: null,
        previousRecordedTime: null
    };

    countDown = () => {
        const { timerData } = this.props;

        const timeElapsed = moment().diff(this.state.previousRecordedTime);
        const newTime = Math.ceil(timerData.startingDuration - moment.duration(timeElapsed).asSeconds())
        if (newTime >= 0) {
            this.props.setTimerDuration(timerData.id,newTime);
        }
    };

    removeTimer = () => {
        this.props.removeTimerByID(this.props.timerData.id);
    }

    componentDidMount = () => {
        this.setState({
            intervalID: setInterval(this.countDown, 1000),
            previousRecordedTime: moment()
        });
    };

    render() {
        const { timerData } = this.props;

        return (
            <Card style={{width: "15%"}} color="red">
                <Card.Content>
                    <Card.Header textAlign="center">Timer
                        <Icon style={{paddingLeft: 5}} onClick={this.removeTimer} name="edit" size="small" color="red" link></Icon>
                    </Card.Header>
                    <Card.Description textAlign="center">
                        {timerData.duration}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default connect(
    null,
    { setTimerDuration, removeTimerByID }
)(Timer);
