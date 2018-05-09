import React, { Component } from "react";
import Navbar from "./Navbar.js";
import "./App.css";
import TwoColumnLayout from "./TwoColumnLayout";
import Help from "./Help";
import TrackCard from "./TrackCard";
import DemoPlayerCard from "./DemoPlayerCard";

const MIDI = window.MIDI;
const $ = window.$;

export default class App extends Component {
  state = {
    sidebarVisible: true
  };
  componentDidMount() {
    $('[data-toggle="popover"]').popover();
    MIDI.loadPlugin({
      soundfontUrl: "/soundfont/",
      instrument: "acoustic_grand_piano",
      onprogress: function(state, progress) {
        console.log(state, progress);
      },
      onsuccess: function() {
        MIDI.setVolume(0, 127);
      }
    });
  }
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
          <DemoPlayerCard className="mt-3" />
        </TwoColumnLayout>
      </div>
    );
  }
}
