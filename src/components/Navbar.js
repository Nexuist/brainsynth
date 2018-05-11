import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            Brainsynth
          </a>
          <span className="navbar-text">Demo v0.5</span>
        </nav>
        <nav className="navbar navbar-dark bg-dark" id="navbar-too">
          <span className="navbar-text">Your Song Name</span>
          <button className="btn btn-info">
            <i className="fas fa-pencil-alt fa-inverse" />
          </button>
          <button className="btn btn-success">
            <i className="fas fa-play" />
          </button>
          <div className="form-check ml-auto">
            <input
              className="form-check-input"
              type="checkbox"
              id="helpCheckbox"
              checked={this.props.helpChecked}
              onChange={event => this.props.helpToggled(event.target.checked)}
            />
            <label
              className="form-check-label navbar-text p-0"
              htmlFor="helpCheckbox"
            >
              Show Help
            </label>
          </div>
        </nav>
      </div>
    );
  }
}
