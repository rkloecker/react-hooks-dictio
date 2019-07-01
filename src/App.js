import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import "../node_modules/materialize-css/dist/css/materialize.min.css";
import "../node_modules/materialize-css/dist/js/materialize.min.js";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/home";

// backend: eng-ger-diction express-mongo git special branch
// dont use main branch!
axios.defaults.baseURL = "http://localhost:5000/api";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
