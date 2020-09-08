import React from "react";
import { Link } from "react-router-dom"; // allows us to switch between pages without having to do refresh or reload
import {
  StyledNavBar,
  StyledNavBrand,
  StyledNavItems,
  StyledLink,
} from "../styled/NavBar";
import { Accent } from "../styled/Random";

export default function Navbar() {
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
      </StyledNavItems>
    </StyledNavBar>
  );
}
