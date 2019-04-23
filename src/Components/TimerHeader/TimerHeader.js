import React from "react";
import { Icon } from "semantic-ui-react";
import AddTimerModal from "./AddTimerModal";

class TimerHeader extends React.Component {
    state = {
        bDisplayAddTimerModal: false
    }

    handleAddTimerModal = () => {
        this.setState({
            bDisplayAddTimerModal: true
        })
    }

    closeModal = () => {
        this.setState({
            bDisplayAddTimerModal: false
        })
    }

    render() {
        const {bDisplayAddTimerModal} = this.state;

        return (
            <div className="timerHeader">
                <Icon
                    onClick={this.handleAddTimerModal}
                    name="plus"
                    link
                    color="green"
                    size="big"
                />

                {(bDisplayAddTimerModal) && <AddTimerModal closeModal={this.closeModal}></AddTimerModal>}
            </div>
        );
    }
}

export default TimerHeader;
