import React from "react";
import { Modal, Button, Confirm } from "semantic-ui-react";

class EditTimerModal extends React.Component {
    state = {
        bConfirmingDelete: false
    };

    confirmDelete = () => {
        this.setState({
            bConfirmingDelete: true
        });
    };

    closeConfirmDelete = () => {
        this.setState({
            bConfirmingDelete: false
        });
    };

    render() {
        const { closeModal, removeTimer } = this.props;
        const { bConfirmingDelete } = this.state;

        return (
            <Modal open={true} size="small">
                <Modal.Header>Edit Timer</Modal.Header>
                <Modal.Content />
                <Modal.Actions>
                    <Button onClick={this.confirmDelete} color="red">
                        Delete Timer
                    </Button>
                    <Button onClick={closeModal} color="red">
                        Cancel
                    </Button>
                    <Confirm
                        size="small"
                        open={bConfirmingDelete}
                        onCancel={this.closeConfirmDelete}
                        onConfirm={removeTimer}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default EditTimerModal;
