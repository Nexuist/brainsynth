import React, { Component, Fragment } from "react";
import { MIDI, allNotes, octaveNotes } from "./Constants";
import BootstrapTabPills from "./BootstrapTabPills";
import InstrumentPicker from "./InstrumentPicker";

export default class DemoPlayer extends Component {
  // Break allNotes up into groups of 8
  groupedNotes = allNotes.reduce(
    (newArr, val) =>
      (newArr[newArr.length - 1].length < 8
        ? newArr[newArr.length - 1].push(val)
        : newArr.push([val])) && newArr,
    [[]]
  );

  play = note => {
    MIDI.noteOn(this.props.channel, note, 127, 0);
    MIDI.noteOff(this.props.channel, note, 0.25);
  };

  render() {
    return (
      <Fragment>
        <InstrumentPicker channel={this.props.channel} />
        <BootstrapTabPills
          titles={["Octaves", "All", "None"]}
          content={[
            <table className="table table-sm text-center mb-0">
              <tbody>
                <tr>
                  {Object.keys(octaveNotes).map((note, i) => (
                    <td key={i} className="border-0">
                      <button
                        type="button"
                        className="btn btn-outline-light btn-sm"
                        onClick={() => this.play(octaveNotes[note])}
                      >
                        {note + "4"}
                      </button>
                    </td>
                  ))}
                </tr>
                <tr>
                  {Object.values(octaveNotes).map((num, i) => (
                    <td key={i} className="border-0">
                      {num}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>,
            <table className="table table-sm text-center mb-0">
              <tbody>
                {this.groupedNotes.map((notes, i) => (
                  <Fragment key={i}>
                    <tr>
                      {notes.map((note, j) => (
                        <td key={j} className="border-0">
                          <button
                            type="button"
                            className="btn btn-outline-light btn-sm"
                            onClick={() => this.play(j + 7 * i + 21)}
                          >
                            {note}
                          </button>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {notes.map((note, j) => (
                        <td key={j} className="border-0">
                          {j + 7 * i + 21}
                        </td>
                      ))}
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>,
            null
          ]}
        />
      </Fragment>
    );
  }
}
