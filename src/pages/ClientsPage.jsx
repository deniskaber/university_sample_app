import React from 'react';
import {Button, ButtonToolbar, Panel, Table} from 'react-bootstrap';
import {apiService} from "../api.service";
import {ClientDetailsPopup} from "./components/ClientDetailsPopup";

export class ClientsPage extends React.Component {
    state = {
        data: [],
        showModal: false,
        selectedItemId: null,
    }

    componentDidMount() {
        this.populateStateWithData();
    }

    populateStateWithData = () => {
        return apiService.get('http://localhost:3001/api/clients')
            .then(data => {
                this.setState(data);
            });
    }

    setEditDetailsMode = (id) => {
        this.setState({
            showModal: true,
            selectedItemId: id,
        });
    }

    setViewListMode = () => {
        this.setState({
            showModal: false,
            selectedItemId: null,
        });
    }

    handleCloseDetailsPopup = () => this.setViewListMode();

    handleSubmitDetailsPopup = (data) => {
        if (this.state.selectedItemId) {
            return apiService.post(`http://localhost:3001/api/clients/${this.state.selectedItemId}`, {
                data,
            }).then(() => {
                this.setViewListMode();

                return this.populateStateWithData();
            });
        }

        return apiService.put(`http://localhost:3001/api/clients`, {
            data,
        }).then(() => {
            this.setViewListMode();

            return this.populateStateWithData();
        });
    }

    handleClickDeleteButton = (id) => {
        return apiService.delete(`http://localhost:3001/api/clients/${id}`)
            .then(() => this.populateStateWithData());
    }

    renderRow = (item) => {
        const {id} = item;

        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.pather_name}</td>
                <td>{item.passport_seria}</td>
                <td>{item.passport_num}</td>
                <td>
                    <Button
                        bsStyle="link"
                        bsSize="xsmall"
                        onClick={() => this.setEditDetailsMode(id)}
                    >Edit</Button>
                    <Button
                        bsStyle="link"
                        bsSize="xsmall"
                        onClick={() => this.handleClickDeleteButton(id)}
                    >Delete</Button>
                </td>
            </tr>
        )
    }

    renderDetailsPopup() {
        if (!this.state.showModal) {
            return null;
        }

        const data = this.state.data.filter(({id}) => id === this.state.selectedItemId);

        return (
            <ClientDetailsPopup
                show
                data={data[0] || {}}
                onClose={this.handleCloseDetailsPopup}
                onSubmit={this.handleSubmitDetailsPopup}
            />
        );
    }

    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <ButtonToolbar>
                        <Button bsStyle="primary" onClick={() => this.setEditDetailsMode(null)}>Add</Button>
                    </ButtonToolbar>
                    {this.renderDetailsPopup()}
                </Panel.Heading>
                <Panel.Body>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Pather Name</th>
                            <th>Passport Seria</th>
                            <th>Passport Num</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map(this.renderRow)}
                        </tbody>
                    </Table>
                </Panel.Body>
            </Panel>
        );
    }

}