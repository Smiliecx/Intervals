import React from "react";
import { connect } from "react-redux";
import TimerContainer from "./Timer/TimerContainer";
import TimerHeader from "./TimerHeader/TimerHeader";
import TimerBucketContainer from "./TimeBuckets/TimerBucketContainer";
import { Segment, Grid } from "semantic-ui-react";

class App extends React.Component {
    render() {
        return (
            <Segment
                inverted
                vertical
                style={{ minHeight: 700, padding: "1em 0em" }}>
                <Grid columns={16}>
                    <Grid.Row>
                        <Grid.Column width={2}/>
                        <Grid.Column widht={6}>
                            <TimerHeader />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2}/>
                        <Grid.Column width={4}>
                            <TimerContainer />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}/>
                        <Grid.Column width={10}>
                            <TimerBucketContainer />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default connect(null)(App);
