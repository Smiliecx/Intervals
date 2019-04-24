import React from "react";
import { connect } from "react-redux";
import TimerContainer from "./Timer/TimerContainer";
import TimerHeader from "./TimerHeader/TimerHeader";
import TimeBucket from "./TimeBuckets/TimeBucket";

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <TimerHeader />
                <TimerContainer />
                <TimeBucket />
            </React.Fragment>
        );
    }
}

export default connect(null)(App);
