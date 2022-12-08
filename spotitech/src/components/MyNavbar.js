import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default class MyNavbar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Link className="navbar-brand" to="/">
            Spotitech
          </Link>
          <Navbar.Toggle></Navbar.Toggle>
          <Navbar.Collapse>
            <Nav className="me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/artists">
                  Artists
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/albums">
                  Albums
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/genres">
                  Genres
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/browse">
                  Browse
                </Link>
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
