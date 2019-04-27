import React from "react";
import { connect } from "react-redux";
import { Icon, Menu, Container, ListIcon } from "semantic-ui-react";
import { clearAllTimers } from "../../Redux/Actions/TimerActions";
import AddTimerModal from "./AddTimerModal";
import ManageIntervalModal from "./ManageIntervalModal";
import EditorAddTimerModal from "./EditorAddTimerModal";

class TimerHeader extends React.Component {
    state = {
        bDisplayAddTimerModal: false,
        bDisplayIntervalsModal: false
    };

    displayModal = (modalName) => {
        this.setState({
            [modalName]: true
        });
    };

    closeModal = () => {
        this.setState({
            bDisplayAddTimerModal: false,
            bDisplayIntervalsModal: false
        });
    };

    clearAllTimers = () => {
        this.props.clearAllTimers();
    };

    render() {
        const { bDisplayAddTimerModal, bDisplayIntervalsModal } = this.state;

        return (
            <div>
                <Menu inverted>
                    <Container>
                        <Menu.Item
                            as="a"
                            onClick={this.displayModal.bind(
                                null,
                                "bDisplayAddTimerModal"
                            )}
                            header>
                            <ListIcon name="plus" />
                            Add Timer
                        </Menu.Item>
                        <Menu.Item
                            as="a"
                            onClick={this.displayModal.bind(
                                null,
                                "bDisplayIntervalsModal"
                            )}
                            header>
                            <Icon name="edit" />
                            Manage Intervals
                        </Menu.Item>
                        <Menu.Item as="a" onClick={this.clearAllTimers} header>
                            <Icon name="remove" />
                            Clear All Timers
                        </Menu.Item>
                    </Container>
                </Menu>

                {bDisplayAddTimerModal && (
                    <EditorAddTimerModal closeModal={this.closeModal} />
                )}
                {bDisplayIntervalsModal && (
                    <ManageIntervalModal closeModal={this.closeModal} />
                )}
            </div>
        );
    }
}

export default connect(
    null,
    { clearAllTimers }
)(TimerHeader);
