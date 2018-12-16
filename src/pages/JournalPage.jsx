import React from 'react';
import {Button, ButtonToolbar, Panel, Table} from 'react-bootstrap';
import {journalApiService} from "../services/journal.api.service";
import {booksApiService} from "../services/books.api.service";
import {clientsApiService} from "../services/clients.api.service";
import {convertCollectionToHash, formatDate, formatMoney} from "../utils";
import {TakeBookFormPopup} from "./components/TakeBookFormPopup";
import {toast} from "react-toastify";

export class JournalPage extends React.Component {
    state = {
        data: [],
        books: [],
        clients: [],
        showModal: false,
    }

    componentDidMount() {
        this.populateStateWithData();
    }

    populateStateWithData() {
        return Promise.all([
            journalApiService.getList(true),
            booksApiService.getList(),
            clientsApiService.getClientsHashObject(),
        ])

            .then(([journalEntries, books, clients]) => {
                this.setState({
                    data: journalEntries,
                    books: convertCollectionToHash(books, 'id', 'name'),
                    clients: clients,
                });
            });
    }

    handleClickBookTake = () => {
        this.setState({
            showModal: true,
        });
    }

    setViewListMode = () => {
        this.setState({
            showModal: false,
        });
    }

    handleClickBookReturn = ({id}) => {
        return journalApiService.submitBookReturn(id)
            .then(() => {
                this.populateStateWithData();
            }, ({error}) => {
                return toast.error(error, {
                    hideProgressBar: true,
                });
            });
    }

    handleSubmitBookTake = ({client_id, book_id}) => {
        return journalApiService.submitBookTake(client_id, book_id)
            .then(() => {
                this.setViewListMode();

                this.populateStateWithData();
            }, ({error}) => {
                return toast.error(error, {
                    hideProgressBar: true,
                });
            });
    }

    renderTakeBookPopup() {
        const {showModal, clients, books} = this.state;

        if (!showModal) {
            return null;
        }

        return (
            <TakeBookFormPopup
                show
                clients={clients}
                books={books}
                onSubmit={this.handleSubmitBookTake}
                onClose={this.setViewListMode}
            />
        );
    }

    renderActionsCell = (item) => {
        if (item.date_beg && !item.date_ret) {
            return (
                <td>
                    <Button
                        bsStyle="link"
                        bsSize="xsmall"
                        onClick={() => this.handleClickBookReturn(item)}
                    >Return</Button>
                </td>
            );
        }

        return (
            <td/>
        );
    }

    renderRow = (item) => {
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.client_name}</td>
                <td>{item.book_name}</td>
                <td>{formatDate(item.date_beg)}</td>
                <td>{formatDate(item.date_end)}</td>
                <td>{formatDate(item.date_ret)}</td>
                <td>{formatMoney(item.fine)}</td>
                {this.renderActionsCell(item)}
            </tr>
        )
    }

    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <ButtonToolbar>
                        <Button bsStyle="primary" onClick={() => this.handleClickBookTake()}>Add</Button>
                    </ButtonToolbar>
                    {this.renderTakeBookPopup()}
                </Panel.Heading>
                <Panel.Body>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Client</th>
                            <th>Book</th>
                            <th>Date Begin</th>
                            <th>Date End</th>
                            <th>Date Return</th>
                            <th>Fine</th>
                            <th>Actions</th>
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