import React from "react";

import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import ServiceStatus from "./ServiceStatus";

const UndecoratedLink = styled(Link)`
    &,
    &:visited,
    &:hover,
    &:active,
    &:focus,
    &:active:hover {
        font-style: inherit;
        color: inherit;
        background-color: transparent;
        font-size: inherit;
        text-decoration: none;
        font-variant: inherit;
        font-weight: inherit;
        line-height: inherit;
        font-family: inherit;
        border-radius: inherit;
        border: inherit;
        outline: inherit;
        box-shadow: inherit;
        padding: inherit;
        vertical-align: inherit;
    }
`;

export default function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <UndecoratedLink to="/">
                        𝗟amdba 𝗣redict 𝗣rotein (𝞴𝗣𝗣)
                    </UndecoratedLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <ServiceStatus />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="https://onlinelibrary.wiley.com/doi/10.1002/pro.4524">
                            Publication
                        </Nav.Link>
                        <Nav.Link href="https://github.com/Rostlab/LambdaPP">
                            Code
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
