<<<<<<< HEAD
import React from "react";
import {
  NavbarContainer,
  NavbarLink,
  NavbarLinks,
  NavbarLogo,
} from "./navbar.styled";

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarLogo href="/">Prototipo Funcional Transcriptor LSCh</NavbarLogo>
      <NavbarLinks>
        <NavbarLink href="/">Inicio</NavbarLink>
      </NavbarLinks>
    </NavbarContainer>
  );
};

export default Navbar;
=======
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
>>>>>>> be26078cd14cbd45465677265b6eee87a8dd73e2
