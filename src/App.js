import React, { Component } from "react";
import Navbar from "./Navbar.js";
import "./App.css";
import BootstrapTwoColumnLayout from "./BootstrapTwoColumnLayout";
import Help from "./Help";
import TrackCard from "./TrackCard";
import { instruments, $, MIDI } from "./Constants";

export default class App extends Component {
  state = {
    sidebarVisible: true
  };
  componentDidMount() {
    $('[data-toggle="popover"]').popover(); // Apparently you need jQuery for this :(
    // MIDI.loadPlugin({
    //   soundfontUrl: "http://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/",
    //   instrument: "taiko_drum",
    //   onprogress: function(state, progress) {
    //     console.log(state, progress);
    //   },
    //   onsuccess: function() {
    //     MIDI.setVolume(0, 127);
    //     MIDI.programChange(0, MIDI.GM.byName["taiko_drum"].number);
    //     console.log("ready");
    //   }
    // });
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
          {/* <DemoPlayerCard className="mt-3" /> */}
        </BootstrapTwoColumnLayout>
      </div>
    );
  }
}
