import React from 'react';
import {Button, ButtonToolbar, Panel, Table} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {apiService, BASE_URL} from "../api.service";
import {BookDetailsPopup} from "./components/BookDetailsPopup";

const BOOKS_URL = `${BASE_URL}/books`;
const BOOK_TYPES_URL = `${BASE_URL}/bookTypes`;

export class BooksPage extends React.Component {
    state = {
        data: [],
        bookTypes: {},
        showModal: false,
        selectedItemId: null,
    }

    componentDidMount() {
        this.populateStateWithData();
    }

    populateStateWithData = () => {
        return Promise.all([
            apiService.get(BOOKS_URL),
            apiService.get(BOOK_TYPES_URL),
        ])
            .then(([books, bookTypes]) => {
                const bookTypesMap = bookTypes.data.reduce((result, item) => {
                    result[item.id] = item.name;

                    return result;
                }, {});

                this.setState({
                    data: books.data,
                    bookTypes: bookTypesMap,
                });
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
            return apiService.post(`${BOOKS_URL}/${this.state.selectedItemId}`, {
                data,
            }).then(() => {
                this.setViewListMode();

                return this.populateStateWithData();
            });
        }

        return apiService.put(BOOKS_URL, {
            data,
        }).then(() => {
            this.setViewListMode();

            return this.populateStateWithData();
        });
    }

    handleClickDeleteButton = (id) => {
        return apiService.delete(`${BOOKS_URL}/${id}`)
            .then(() => this.populateStateWithData())
            .catch(({error}) => toast.error(error, {
                hideProgressBar: true,
            }));
    }

    renderRow = (item) => {
        const {id} = item;

        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>{this.state.bookTypes[item.type_id]}</td>
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
            <BookDetailsPopup
                show
                data={data[0] || {}}
                bookTypes={this.state.bookTypes}
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
                            <th>Title</th>
                            <th>Count</th>
                            <th>Type</th>
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