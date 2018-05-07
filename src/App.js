import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            Brainsynth
          </a>
          <span className="navbar-text">Demo Version</span>
        </nav>
        <nav className="navbar navbar-dark bg-dark" style={{"justify-content": "flex-start"}}>
          <span className="navbar-text">Your Song Name</span>
          <button class="btn btn-info">
            <i class="fas fa-pencil-alt fa-inverse" />
          </button>
          <button class="btn btn-success">
            <i class="fas fa-play" />
          </button>
        </nav>
      </div>
    );
  }
}

export default App;
