import React from "react";
import { Icon, Menu, Container, ListIcon } from "semantic-ui-react";
import AddTimerModal from "./AddTimerModal";
import ManageIntervalModal from "./ManageIntervalModal";

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
                    </Container>
                </Menu>

                {bDisplayAddTimerModal && (
                    <AddTimerModal closeModal={this.closeModal} />
                )}
                {bDisplayIntervalsModal && (
                    <ManageIntervalModal closeModal={this.closeModal} />
                )}
            </div>
        );
    }
}

export default TimerHeader;
