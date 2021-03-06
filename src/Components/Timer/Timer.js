import React from "react";
import { connect } from "react-redux";
import { Segment, Icon } from "semantic-ui-react";
import {
    setTimerDuration,
    removeTimerByID,
    incrementTimerDurationByID,
    restartTimerByID,
    moveTimerByID,
    moveFrontToBack,
    editTimerByID
} from "../../Redux/Actions/TimerActions";
import moment from "moment";
import { subscribe } from "../../Redux/StoreSubscriber";
import { increaseBucketAmountByColor } from "../../Redux/Actions/TimeBucketActions";
import EditorAddTimerModal from "../TimerHeader/EditorAddTimerModal";

class Timer extends React.Component {
    state = {
        invervalID: null,
        previousRecordedTime: null,
        startingDuration: 0,
        bDisplayEditTimerModal: false,
        unsubscribeFromStore: null,
        bIsPlaying: false
    };

    constructor(props) {
        super(props);
        this.countDown = this.countDown.bind(this);
    }

    countDown() {
        const { timerData } = this.props;

        const timeElapsed = moment().diff(this.state.previousRecordedTime);
        const timeElapsedInSeconds = Math.round(
            moment.duration(timeElapsed).asSeconds()
        );

        this.props.incrementTimerDurationByID(
            timerData.id,
            -timeElapsedInSeconds
        );

        if (timerData.duration <= 0) {
            if (timerData.finishOption === "GotoEnd") {
                this.stopTimer();
                this.props.moveFrontToBack();
            } else if (timerData.finishOption === "Delete") {
                this.removeTimer();
                return;
            } else {
                this.props.increaseBucketAmountByColor(
                    timerData.timerBucketColor,
                    timeElapsedInSeconds
                );
            }
        }

        this.setState({
            previousRecordedTime: moment()
        });
    }

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
        this.clearTimer();
        this.props.removeTimerByID(this.props.timerData.id);
    };

    clearTimer = () => {
        this.stopTimer();
        if (this.state.unsubscribeFromStore !== null) {
            this.state.unsubscribeFromStore();
        }
    };

    timerListChanged = (newState, prevState) => {
        const newTimerList = newState.Timers.timerList;

        const newTimer = newTimerList.find((timer) => {
            return timer.id === this.props.timerData.id;
        });

        if (!newTimer) {
            this.clearTimer();
            return;
        }

        if (newTimer.startingDuration !== this.state.startingDuration) {
            this.setState({
                previousRecordedTime: moment(),
                startingDuration: newTimer.startingDuration
            });
        }
    };

    moveTimerUp = () => {
        this.props.moveTimerByID(this.props.timerData.id, -1);
    };

    moveTimerDown = () => {
        this.props.moveTimerByID(this.props.timerData.id, 1);
    };

    restartTimer = () => {
        this.props.restartTimerByID(this.props.timerData.id);
        if (this.state.bIsPlaying) {
            this.stopTimer();
        }
    };

    toggleTimer = () => {
        if (this.state.bIsPlaying) {
            this.stopTimer();
        } else {
            this.startTimer();
        }
    };

    startTimer = () => {
        this.setState({
            intervalID: setInterval(this.countDown, 1000),
            previousRecordedTime: moment(),
            unsubscribeFromStore: subscribe(
                "Timers.timerList",
                this.timerListChanged
            ),
            startingDuration: this.props.startingDuration,
            bIsPlaying: true
        });
    };

    stopTimer = () => {
        clearInterval(this.state.intervalID);
        this.setState({
            bIsPlaying: false
        });
    };

    componentDidMount = () => {
        if (this.props.bIsFirstTimer && this.props.timerData.autoStart) {
            this.startTimer();
        }
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.bIsFirstTimer !== this.props.bIsFirstTimer) {
            if (this.props.bIsFirstTimer) {
                if (this.props.timerData.forceStart) {
                    this.startTimer();
                    this.props.editTimerByID(this.props.timerData.id, {
                        forceStart: false
                    });
                } else if (this.props.timerData.autoStart) {
                    this.startTimer();
                }
            } else {
                this.clearTimer();
            }
        }
    };

    render() {
        //prettier-ignore
        const { timerData, bIsFirstTimer, bIsLastTimer } = this.props;
        const { bDisplayEditTimerModal, bIsPlaying } = this.state;
        return (
            <React.Fragment>
                <Segment
                    color={timerData.timerBucketColor.toLowerCase()}
                    raised>
                    <span
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                        <span style={{ display: "flex" }}>
                            <Icon
                                onClick={this.moveTimerUp}
                                link={!bIsFirstTimer}
                                disabled={bIsFirstTimer}
                                name="arrow left"
                                color="green"
                                size="small"
                            />
                            <Icon
                                onClick={this.moveTimerDown}
                                link={!bIsLastTimer}
                                disabled={bIsLastTimer}
                                name="arrow right"
                                color="green"
                                size="small"
                            />
                        </span>
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

                        <div
                            style={
                                timerData.duration >= 0
                                    ? { color: "black" }
                                    : { color: "red" }
                            }>
                            {timerData.duration}
                        </div>

                        <Icon
                            onClick={this.toggleTimer}
                            size="small"
                            link={bIsFirstTimer}
                            color={bIsPlaying ? "red" : "green"}
                            name={bIsPlaying ? "stop" : "play"}
                            disabled={!bIsFirstTimer}
                        />
                        <Icon
                            onClick={this.restartTimer}
                            name="repeat"
                            size="small"
                            link
                            color="yellow"
                        />
                    </span>
                </Segment>
                {bDisplayEditTimerModal && (
                    <EditorAddTimerModal
                        timerData={timerData}
                        bIsEdit={true}
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
    {
        setTimerDuration,
        removeTimerByID,
        increaseBucketAmountByColor,
        incrementTimerDurationByID,
        restartTimerByID,
        moveTimerByID,
        moveFrontToBack,
        editTimerByID
    }
)(Timer);
