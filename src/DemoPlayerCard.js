import React, { Component } from "react";

const MIDI = window.MIDI;
const notes = [
  "A0",
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "A6",
  "A7",
  "Ab1",
  "Ab2",
  "Ab3",
  "Ab4",
  "Ab5",
  "Ab6",
  "Ab7",
  "B0",
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
  "B6",
  "B7",
  "Bb0",
  "Bb1",
  "Bb2",
  "Bb3",
  "Bb4",
  "Bb5",
  "Bb6",
  "Bb7",
  "C1",
  "C2",
  "C3",
  "C4",
  "C5",
  "C6",
  "C7",
  "C8",
  "D1",
  "D2",
  "D3",
  "D4",
  "D5",
  "D6",
  "D7",
  "Db1",
  "Db2",
  "Db3",
  "Db4",
  "Db5",
  "Db6",
  "Db7",
  "Db8",
  "E1",
  "E2",
  "E3",
  "E4",
  "E5",
  "E6",
  "E7",
  "Eb1",
  "Eb2",
  "Eb3",
  "Eb4",
  "Eb5",
  "Eb6",
  "Eb7",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "G1",
  "G2",
  "G3",
  "G4",
  "G5",
  "G6",
  "G7",
  "Gb1",
  "Gb2",
  "Gb3",
  "Gb4",
  "Gb5",
  "Gb6",
  "Gb7"
];

let octaveNotes = {
  A: 25,
  B: 40,
  C: 55,
  D: 63,
  E: 78,
  F: 92,
  G: 99
};

export default class DemoPlayerCard extends Component {
  play = note => {
    MIDI.noteOn(0, note, 127, 0);
    MIDI.noteOff(0, note, 0.25);
  };

  render() {
    return (
      <div className={`card bg-secondary text-white ${this.props.className}`}>
        <div className="card-header">
          <h4>Demo Player</h4>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-sm text-center mb-0">
            <tbody>
              <tr>
                {notes.map((note, i) => (
                  <td key={i} className="border-0">
                    <button
                      type="button"
                      className="btn btn-outline-light btn-sm"
                      onClick={() => this.play(i + 21)}
                    >
                      {note}
                    </button>
                  </td>
                ))}
              </tr>
              <tr>
                {notes.map((note, i) => (
                  <td className="border-0" key={i}>
                    {i + 21}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <table
            className="table table-sm text-center mb-0 mt-0"
            style={{ width: "25%" }}
          >
            <tbody>
              <tr>
                {Object.keys(octaveNotes).map((key, i) => (
                  <td key={i} className="border-0">
                    <button
                      type="button"
                      className="btn btn-outline-light btn-sm"
                      onClick={() => this.play(octaveNotes[key])}
                    >
                      {key + "4"}
                    </button>
                  </td>
                ))}
              </tr>
              <tr>
                {Object.keys(octaveNotes).map((key, i) => (
                  <td key={i} className="border-0">
                    {octaveNotes[key]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
