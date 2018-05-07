import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div class="app">
        <nav class="navbar navbar-dark bg-dark">
          <a class="navbar-brand" href="#">
            Brainsynth
          </a>
          <span class="navbar-text">Demo Version</span>
        </nav>
        <nav
          class="navbar navbar-dark bg-dark"
          style={{ justifyContent: "flex-start" }}
        >
          <span class="navbar-text">Your Song Name</span>
          <button class="btn btn-info">
            <i class="fas fa-pencil-alt fa-inverse" />
          </button>
          <button class="btn btn-success">
            <i class="fas fa-play" />
          </button>
        </nav>
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-8 p-4">
              <div class="card bg-secondary text-white">
                <div class="card-header table-responsive">
                  <table class="table table-bordered table-sm text-center mb-0">
                    <tbody>
                      <tr>
                        {Array.apply(null, Array(30)).map((val, i) => (
                          <td key={i} className={i == 0 ? "bg-dark" : ""}>
                            0
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="card-body">
                  <textarea
                    class="bg-dark text-white p-2"
                    style={{
                      boxSizing: "border-box",
                      width: "100%",
                      letterSpacing: "3px"
                    }}
                  />
                </div>
                <div class="card-footer">
                  <div class="btn-group" role="group">
                    <button type="button" class="btn btn-success">
                      <i class="fas fa-play" />
                    </button>
                    <button type="button" class="btn btn-dark">
                      <i class="fas fa-angle-left" />
                    </button>
                    <button type="button" class="btn btn-dark">
                      <i class="fas fa-angle-right" />
                    </button>
                    <button type="button" class="btn btn-dark">
                      <i class="fas fa-angle-double-right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-4 bg-secondary p-4 text-white">
              <h3>Introduction</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
