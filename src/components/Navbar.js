import React from "react";
import { Link } from "react-router-dom"; // allows us to switch between pages without having to do refresh or reload

export default function Navbar() {
  return (
    <nav>
      <div>
        <Link to="/">
          Learn.Build.<span>Type.</span>
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>{" "}
        </li>
        <li>
          <Link to="/highScores">HighScores</Link>{" "}
        </li>
      </ul>
    </nav>
  );
}
