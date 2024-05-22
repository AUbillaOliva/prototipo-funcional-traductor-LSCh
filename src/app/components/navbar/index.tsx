import React from "react";
import {
  NavbarContainer as Navbar,
  NavbarLinks as Nav,
  NavLink
} from "./navbar.styled";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Brand href="/">Transcriptor LSCh</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav>
          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/acerca">Acerca de</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
