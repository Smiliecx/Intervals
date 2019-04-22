import React from "react";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";

class Timer extends React.Component {
    countDown = () => {};

    render() {
        const {timerData} = this.props;

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

export default Timer;
