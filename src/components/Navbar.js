import React from "react";
import { Link } from "react-router-dom"; // allows us to switch between pages without having to do refresh or reload
import {
  StyledNavBar,
  StyledNavBrand,
  StyledNavItems,
  StyledLink,
} from "../styled/NavBar";
import { Accent } from "../styled/Random";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <StyledNavBar>
      <StyledNavBrand>
        <Link to="/">
          Learn.Build.<Accent>Type.</Accent>
        </Link>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLink to="/">Home</StyledLink>{" "}
        </li>
        <li>
          <StyledLink to="/highScores">HighScores</StyledLink>{" "}
        </li>
        {!isAuthenticated && (
          <li>
            <button onClick={() => loginWithRedirect()}>Login</button>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <button onClick={() => logout()}>Logout</button>
          </li>
        )}
      </StyledNavItems>
    </StyledNavBar>
  );
}
