import React from 'react';
import {Alert, FormGroup, ControlLabel, FormControl, Modal, Button} from 'react-bootstrap';
import {renderSelectOptions} from "../../utils";

export class TakeBookFormPopup extends React.Component {
    state = {
        error: null,
        data: {
            client_id: null,
            book_id: null,
        },
    }

    handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }

        this.props.onSubmit(this.state.data)
            .catch(({error}) => {
                this.setState({error});
            });
    }

    handleFieldChange = (e) => {
        const {name, value} = e.target;

        this.setState((prevState) => ({
            data: {
                ...prevState.data,
                [name]: value,
            }
        }));
    }

    renderDetailsForm = (data, clients, books) => {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="Client">
                    <ControlLabel>Client</ControlLabel>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        name="client_id"
                        value={data.client_id || ''}
                        onChange={this.handleFieldChange}
                    >
                        <option key={0} value="" />
                        {renderSelectOptions(clients)}
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="Book">
                    <ControlLabel>Book</ControlLabel>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        name="book_id"
                        value={data.book_id || ''}
                        onChange={this.handleFieldChange}
                    >
                        <option key={0} value="" />
                        {renderSelectOptions(books)}
                    </FormControl>
                </FormGroup>
            </form>
        );
    }

    renderErrorMessage = (error) => {
        if (!error) {
            return null;
        }

        return (
            <Alert bsStyle="danger">
                <strong>Holy guacamole!</strong> {error}
            </Alert>
        );
    }

    render() {
        const {show, onClose, clients, books} = this.props;
        const {data, error} = this.state;

        return (
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Take a book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderDetailsForm(data, clients, books)}
                    {this.renderErrorMessage(error)}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button bsStyle="primary" onClick={this.handleSubmit}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}