import React from "react"; 
import { connect } from "react-redux";
import TimerContainer from "./Timer/TimerContainer";

class App extends React.Component {

    render() {
        return (
            <TimerContainer></TimerContainer>
        );
    }
}

export default connect(
    null
)(App);
