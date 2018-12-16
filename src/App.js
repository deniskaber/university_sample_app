import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Header} from './Header';
import {JournalPage} from "./pages/JournalPage";
import {ClientsPage} from "./pages/ClientsPage";
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <section className="page-layout">
                        <Route path="/clients" component={ClientsPage}/>
                        <Route path="/journal" component={JournalPage}/>
                    </section>
                </div>
            </Router>
        );
    }
}

export default App;
