import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper">
        <div className="xcontainer">
          <Link to="/" className="logo">
            React Hooks Dictionary
          </Link>
          <ul id="nav-mobile" className="right hide-on-sm-and-down">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
