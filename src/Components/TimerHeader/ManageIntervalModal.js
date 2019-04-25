import React from "react";
import { Modal, Button } from "semantic-ui-react";

class ManageIntervalModal extends React.Component {
    render() {
        return <Modal open={true}>
            <Modal.Header>Manage Intervals</Modal.Header>
            <Modal.Content>
    
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={this.props.closeModal}>Close</Button>
            </Modal.Actions>
        </Modal>
    }
}

export default ManageIntervalModal;
