import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Header} from './Header';
import {JournalPage} from "./pages/JournalPage";
import {ClientsPage} from "./pages/ClientsPage";
import {BooksPage} from "./pages/BooksPage";
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <ToastContainer
                        draggable={false}
                    />
                    <section className="page-layout">
                        <Switch>
                            <Route path="/clients" component={ClientsPage}/>
                            <Route path="/books" component={BooksPage}/>
                            <Route path="/journal" component={JournalPage}/>
                        </Switch>
                    </section>
                </div>
            </Router>
        );
    }
}

export default App;
