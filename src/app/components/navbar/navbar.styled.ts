<<<<<<< HEAD
import Link from "next/link";
import styled from "styled-components";

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f3f3f3;
  color: #000;
  z-index: 100;
`;

export const NavbarLogo = styled(Link)`
  font-size: 1.5rem;
`;

export const NavbarLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

export const NavbarLink = styled(Link)`
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;
=======
import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

export const NavbarContainer = styled(Navbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f3f3f3;
  color: #000;
  z-index: 100;
`;

export const NavbarLinks = styled(Nav)`
  // display: flex;
  // gap: 1rem;
  color: #000;
`;

export const NavLink = styled(Link)`
  color: #000;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: blue;
  }
`;
>>>>>>> be26078cd14cbd45465677265b6eee87a8dd73e2
