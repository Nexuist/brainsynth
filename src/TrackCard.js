import React, { Component } from "react";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const MIDI = window.MIDI;

export default class TrackCard extends Component {
  state = {
    metaState: new Array(30).fill(0),
    code: "",
    ptr: 0, // Pointer
    pc: 0, // Program counter
    timeBit: 0.25, // Special bit for time delays
    loopStack: [], // Keep track of where loops start so we can reset the PC to them
    keepRunning: false
  };

  runOnce = async () => {
    // Save these locally so we only have to do one final setState
    let { metaState, ptr, pc, timeBit, loopStack } = this.state;
    switch (this.state.code[this.state.pc]) {
      case ">":
        ptr += 1;
        if (ptr > 30) ptr = 0;
        break;
      case "<":
        ptr -= 1;
        if (ptr < 0) ptr = 30;
        break;
      case "+":
        metaState[ptr] += 1;
        if (metaState[ptr] > 255) metaState[ptr] = 0;
        break;
      case "-":
        metaState[ptr] -= 1;
        if (metaState[ptr] < 0) metaState[ptr] = 255;
        break;
      case "[":
        loopStack = [pc, ...loopStack];
        break;
      case "]":
        if (metaState[ptr] == 0) {
          loopStack.shift(); // Remove first element
        } else {
          pc = loopStack[0] - 1; // Because it'll get 1 added later
        }
        break;
      case "^":
        timeBit += 0.25;
        break;
      case "v":
        timeBit -= 0.25;
        if (timeBit <= 0) timeBit = 0.25;
        break;
        "";
      case ",":
        await sleep(timeBit * 1000);
        break;
      case ".":
        MIDI.noteOn(0, metaState[ptr], 127, 0);
        MIDI.noteOff(0, metaState[ptr], timeBit);
        await sleep(timeBit * 1000);
        break;
    }
    pc += 1;
    await this.setState({
      metaState,
      ptr,
      pc,
      timeBit,
      loopStack
    });
  };

  run = async () => {
    if (this.state.pc >= this.state.code.length) await this.reset();
    await this.setState({
      keepRunning: true
    });
    while (this.state.keepRunning && this.state.pc < this.state.code.length) {
      await this.runOnce();
    }
    await this.setState({
      keepRunning: false
    });
  };

  reset = () => {
    this.setState({
      metaState: new Array(30).fill(0),
      ptr: 0,
      pc: 0,
      timeBit: 0.25,
      loopStack: [],
      keepRunning: false
    });
  };

  render() {
    return (
      <div className="card bg-secondary text-white">
        <div className="card-header table-responsive">
          <table className="table table-bordered table-sm text-center mb-0">
            <tbody>
              <tr>
                <td>{this.state.timeBit}</td>
                <td className="column-spacer" />
                {this.state.metaState.map((val, i) => (
                  <td key={i} className={this.state.ptr === i ? "bg-dark" : ""}>
                    {val}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-body">
          <textarea
            className="bg-dark text-white p-2 code"
            value={this.code}
            onKeyUp={event => this.setState({ code: event.target.value })}
          />
        </div>
        <div className="card-footer">
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                this.state.keepRunning
                  ? this.setState({ keepRunning: false })
                  : this.run()
              }
            >
              <i
                className={
                  "fas fa-" + (this.state.keepRunning ? "pause" : "play")
                }
              />
            </button>
            <button type="button" className="btn btn-dark">
              <i className="fas fa-angle-left" />
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => this.runOnce()}
            >
              <i className="fas fa-angle-right" />
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => MIDI.noteOn(0, 21, 127, 0)}
            >
              <i className="fas fa-angle-double-right" />
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => this.reset()}
            >
              <i className="fas fa-stop" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
