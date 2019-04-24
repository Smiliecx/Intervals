import React from "react";
import { connect } from "react-redux";
import { Segment, Icon, Header } from "semantic-ui-react";
import {
    setTimerDuration,
    removeTimerByID
} from "../../Redux/Actions/TimerActions";
import moment from "moment";
import { subscribe } from "../../Redux/Reducers/StoreSubscriber";
import EditTimerModal from "./EditTimerModal";

class Timer extends React.Component {
    state = {
        invervalID: null,
        previousRecordedTime: null,
        startingDuration: 0,
        bDisplayEditTimerModal: false,
        unsubscribeFromStore: null
    };

    constructor(props) {
        super(props);
        this.countDown = this.countDown.bind(this);
    }

    countDown() {
        const { timerData } = this.props;

        const timeElapsed = moment().diff(this.state.previousRecordedTime);
        const newTime = Math.ceil(
            timerData.startingDuration -
                moment.duration(timeElapsed).asSeconds()
        );
        if (newTime >= 0) {
            this.props.setTimerDuration(timerData.id, newTime);
        }
    };

    displayEditTimerModal = () => {
        this.setState({
            bDisplayEditTimerModal: true
        });
    };

    closeModals = () => {
        this.setState({
            bDisplayEditTimerModal: false
        });
    };

    removeTimer = () => {
        clearInterval(this.state.intervalID);
        this.state.unsubscribeFromStore();
        this.props.removeTimerByID(this.props.timerData.id);
    };

    timerListChanged = (newState, prevState) => {
        const newTimerList = newState.Timers.timerList;

        const newTimer = newTimerList.find( (timer) => {
            return timer.id === this.props.timerData.id
        })

        if (newTimer.startingDuration !== this.state.startingDuration) {
            this.setState({
                previousRecordedTime: moment(),
                startingDuration: newTimer.startingDuration
            })
        }
    }

    componentDidMount = () => {
        this.setState({
            intervalID: setInterval(this.countDown, 1000),
            previousRecordedTime: moment(),
            unsubscribeFromStore: subscribe("Timers.timerList", this.timerListChanged),
            startingDuration: this.props.startingDuration
        });
    };

    render() {
        const { timerData } = this.props;
        const { bDisplayEditTimerModal } = this.state;
        return (
            <React.Fragment>
                <Segment color="red" raised>
                    <span
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                        <span style={{ display: "flex", alignItems: "center" }}>
                            <h3 style={{ padding: 0, marginBottom: 3 }}>
                                Timer
                            </h3>
                            <Icon
                                style={{ paddingLeft: 5 }}
                                onClick={this.displayEditTimerModal}
                                name="edit"
                                size="small"
                                color="yellow"
                                link
                            />
                        </span>

                        {timerData.duration}
                    </span>
                </Segment>
                {bDisplayEditTimerModal && (
                    <EditTimerModal
                        closeModal={this.closeModals}
                        removeTimer={this.removeTimer}
                        timerID={timerData.id}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default connect(
    null,
    { setTimerDuration, removeTimerByID }
)(Timer);
