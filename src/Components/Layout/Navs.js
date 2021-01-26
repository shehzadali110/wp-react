import React from 'react';
import { Navbar, Nav, Image, Container } from 'react-bootstrap';

function NavBar() {
    return (

        <Navbar sticky="top" expand="md">
            <Container>
                <Navbar.Brand href="/">
                    <Image fluid src={require('../../Dist/Images/logo.png')} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="konstructs-navbar" />
                <Navbar.Collapse id="konstructs-navbar">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Articles</Nav.Link>
                        <Nav.Link href="#features">3D Printers</Nav.Link>
                        <Nav.Link href="#pricing">Tutorials</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="#home">Advertise</Nav.Link>
                        <Nav.Link href="#features">About Us</Nav.Link>
                        <Nav.Link href="#pricing">Contact Us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavBar
