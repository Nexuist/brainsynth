import React, { Component } from "react";
import Navbar from "./Navbar.js";
import "./App.css";
import TwoColumnLayout from "./TwoColumnLayout";
import Help from "./Help";
import TrackCard from "./TrackCard";

export default class App extends Component {
  state = {
    sidebarVisible: true
  };
  render() {
    return (
      <div className="app">
        <Navbar
          helpChecked={this.state.sidebarVisible}
          helpToggled={val => this.setState({ sidebarVisible: val })}
        />
        <TwoColumnLayout
          showSidebar={this.state.sidebarVisible}
          sidebar={<Help />}
        >
          <TrackCard />
        </TwoColumnLayout>
      </div>
    );
  }
}
