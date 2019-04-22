import React from "react";
import { addNewTimer } from "../../Redux/Actions/TimerActions";
import { connect } from "react-redux";
import Timer from "./Timer";

class TimerContainer extends React.Component {
    componentDidMount() {
        this.props.addNewTimer(12)
    }
    render() {
        return (
            <div className="timerContainer">
                {this.props.timerList.map((timer) => {
                    return <Timer key={timer.id} timerData={timer} />;
                })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { timerList: state.Timers.timerList };
}

export default connect(
    mapStateToProps,
    {addNewTimer}
)(TimerContainer);
