import React from 'react';
import {Alert, FormGroup, ControlLabel, FormControl, Modal, Button} from 'react-bootstrap';
import {cloneDeep} from 'lodash';

export class ClientDetailsPopup extends React.Component {
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
            return 'Create new client';
        }

        return `Edit client ${data.first_name} ${data.last_name}`;
    }

    renderIdField = (data) => {
        if (!data.id) {
            return null;
        }

        return (
            <FormGroup controlId="id">
                <ControlLabel>Client ID</ControlLabel>
                <FormControl.Static
                    type="text"
                    name="id"
                >{data.id}</FormControl.Static>
            </FormGroup>
        );
    }

    renderDetailsForm = (data) => {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderIdField(data)}
                <FormGroup controlId="firstName">
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                        type="text"
                        name="first_name"
                        value={data.first_name || ''}
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="lastName">
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl
                        type="text"
                        name="last_name"
                        value={data.last_name || ''}
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="patherName">
                    <ControlLabel>Pather Name</ControlLabel>
                    <FormControl
                        type="text"
                        name="pather_name"
                        value={data.pather_name || ''}
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="passportSeria">
                    <ControlLabel>Passport Seria</ControlLabel>
                    <FormControl
                        type="text"
                        name="passport_seria"
                        value={data.passport_seria || ''}
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="passportNumber">
                    <ControlLabel>Passport Number</ControlLabel>
                    <FormControl
                        type="text"
                        name="passport_num"
                        value={data.passport_num || ''}
                        onChange={this.handleFieldChange}
                    />
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