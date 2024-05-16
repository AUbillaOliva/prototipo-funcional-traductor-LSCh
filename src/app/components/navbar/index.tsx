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
        <NavbarLink href="/acerca">Acerca de</NavbarLink>
        <NavbarLink href="/contacto">Contacto</NavbarLink>
      </NavbarLinks>
    </NavbarContainer>
  );
};

export default Navbar;
