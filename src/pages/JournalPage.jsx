import React from 'react';
import {Table} from 'react-bootstrap';
import {apiService} from "../api.service";

export class JournalPage extends React.Component {
    state = {
        data: [],
    }

    componentDidMount() {
        apiService.get('http://localhost:3001/api/journal')
            .then(data => {
                this.setState(data);
            });
    }

    renderRow(item) {
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.client_id}</td>
                <td>{item.book_id}</td>
                <td>{item.date_beg}</td>
                <td>{item.date_end}</td>
                <td>{item.date_ret}</td>
            </tr>
        )
    }

    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Client</th>
                    <th>Book</th>
                    <th>Date Begin</th>
                    <th>Date End</th>
                    <th>Date Return</th>
                </tr>
                </thead>
                <tbody>
                {this.state.data.map(this.renderRow)}
                </tbody>
            </Table>
        );
    }
}