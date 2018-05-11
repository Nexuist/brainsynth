import React, { Component } from "react";
import { instruments, MIDI } from "./Constants";

export default class InstrumentPicker extends Component {
  state = {
    instrument: "bird_tweet"
  };

  loadNewInstrument = instrument => {
    console.log(`Loading ${instrument}`);
    MIDI.loadPlugin({
      soundfontUrl: "http://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/",
      instrument: instrument,
      onprogress: (a, b) => console.log(a, b),
      onsuccess: () => {
        console.log(`Loaded ${instrument} onto channel ${this.props.channel}`);
        MIDI.setVolume(this.props.channel, 127);
        MIDI.programChange(
          this.props.channel,
          MIDI.GM.byName[instrument].number
        );
      }
    });
  };

  changeInstrument = newInstrument => {
    this.setState({
      instrument: newInstrument
    });
    this.loadNewInstrument(newInstrument);
  };

  componentDidMount() {
    this.loadNewInstrument(this.state.instrument);
  }

  render() {
    return (
      <div className={`input-group ${this.props.className}`}>
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Instrument
          </label>
        </div>
        <select
          className="custom-select"
          id="inputGroupSelect01"
          onChange={event => this.changeInstrument(event.target.value)}
          value={this.state.instrument}
        >
          {instruments.map((instrument, i) => (
            <option key={i} value={instrument}>
              {instrument}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
