import React from "react";
import { connect } from "react-redux";
import TimerContainer from "./Timer/TimerContainer";
import TimerHeader from "./TimerHeader/TimerHeader";

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <TimerHeader />
                <TimerContainer />
            </React.Fragment>
        );
    }
}

export default connect(null)(App);
