import React from "react";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import { setTimerDuration } from "../../Redux/Actions/TimerActions";
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
        if (newTime> 0) {
            this.props.setTimerDuration(timerData.id,newTime);
        }
    };

    componentDidMount = () => {
        this.setState({
            intervalID: setInterval(this.countDown, 1000),
            previousRecordedTime: moment()
        });
    };

    render() {
        const { timerData } = this.props;

        return (
            <Card color="red">
                <Card.Content>
                    <Card.Header textAlign="center">Timer</Card.Header>
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
    { setTimerDuration }
)(Timer);
