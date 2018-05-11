import React, { Component } from "react";
import Navbar from "./components/Navbar.js";
import "./App.css";
import BootstrapTwoColumnLayout from "./components/BootstrapTwoColumnLayout";
import Help from "./components/Help";
import TrackCard from "./components/TrackCard";

export default class App extends Component {
  state = {
    sidebarVisible: true
  };
  componentDidMount() {
    window.$('[data-toggle="popover"]').popover(); // Apparently you need jQuery for this :(
  }
  render() {
    return (
      <div className="app">
        <Navbar
          helpChecked={this.state.sidebarVisible}
          helpToggled={val => this.setState({ sidebarVisible: val })}
        />
        <BootstrapTwoColumnLayout
          showSidebar={this.state.sidebarVisible}
          sidebar={<Help />}
        >
          <TrackCard />
        </BootstrapTwoColumnLayout>
      </div>
    );
  }
}
