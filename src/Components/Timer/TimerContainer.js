import React from "react";
import { addNewTimer } from "../../Redux/Actions/TimerActions";
import { connect } from "react-redux";
import Timer from "./Timer";
import { Grid } from "semantic-ui-react";

class TimerContainer extends React.Component {
    componentDidMount() {
        
    }
    render() {
        return (
            <Grid
                style={{ marginTop: "3vh", marginLeft: "5px" }}
                divided="vertically">
                <Grid.Row columns={5}>
                    {this.props.timerList.map((timer) => {
                        return (
                            <Grid.Column width={3} key={timer.id}>
                                <Timer timerData={timer}/>
                            </Grid.Column>
                        );
                    })}
                </Grid.Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return { timerList: state.Timers.timerList };
}

export default connect(
    mapStateToProps,
    { addNewTimer }
)(TimerContainer);
