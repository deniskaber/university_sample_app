import React from 'react';
import {Alert, FormGroup, ControlLabel, FormControl, Modal, Button} from 'react-bootstrap';
import {cloneDeep} from 'lodash';

export class BookDetailsPopup extends React.Component {
    state = {
        initialData: {},
        error: null,
        data: {},
    }

    constructor(props) {
        super(props);

        this.state.initialData = cloneDeep(props.data);
        this.state.data = props.data;
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

    renderModalTitle = (data) => {
        if (!data.id) {
            return 'Create new book';
        }

        return `Edit book ${data.name}`;
    }

    renderIdField = (data) => {
        if (!data.id) {
            return null;
        }

        return (
            <FormGroup controlId="id">
                <ControlLabel>Book ID</ControlLabel>
                <FormControl.Static
                    type="text"
                    name="id"
                >{data.id}</FormControl.Static>
            </FormGroup>
        );
    }

    renderDetailsForm = (data) => {
        const {bookTypes} = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderIdField(data)}
                <FormGroup controlId="name">
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                        type="text"
                        name="name"
                        value={data.name || ''}
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="count">
                    <ControlLabel>Count</ControlLabel>
                    <FormControl
                        type="text"
                        name="count"
                        value={data.count || ''}
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="type">
                    <ControlLabel>Type</ControlLabel>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        name="type_id"
                        value={data.type_id || ''}
                        onChange={this.handleFieldChange}
                    >
                        {
                            Object.keys(bookTypes).map((typeId) => (
                                <option key={typeId} value={typeId}>{bookTypes[typeId]}</option>
                            ))
                        }
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
        const {show, onClose} = this.props;
        const {data, error} = this.state;

        return (
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.renderModalTitle(data)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderDetailsForm(data)}
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