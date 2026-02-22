import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  background: black;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Bars = styled.div``;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledNavButton = styled(Link)`
  background: transparent;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 5px 10px;
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    background: grey;
  }
`;

export const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 5px 10px;
  transition: all 0.2s;

  &:hover {
    background: grey;
  }
`;
