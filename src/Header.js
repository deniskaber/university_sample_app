import React from 'react';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';

export const Header = () => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Bibliothèque</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavDropdown eventKey={1} title="Dictionaries" id="basic-nav-dropdown">
                    <MenuItem eventKey={1.1} href="/clients">Clients</MenuItem>
                    <MenuItem eventKey={1.2} href="/books">Books</MenuItem>
                </NavDropdown>
                <NavItem eventKey={2} href="/journal">
                    Journal
                </NavItem>
                <NavItem eventKey={3} href="/reports">
                    Reports
                </NavItem>
            </Nav>
        </Navbar>
    );
};
