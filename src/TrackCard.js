import React, { Component } from "react";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const MIDI = window.MIDI;
const MAX_LOOP_ITERATIONS = 255;

export default class TrackCard extends Component {
  state = {
    metaState: new Array(30).fill(0),
    code: "",
    ptr: 0, // Pointer
    pc: 0, // Program counter
    timeBit: 0.25, // Special bit for time delays
    loopStack: [], // Keep track of where loops start so we can reset the PC to them
    loopIterations: 0, // Keep track of how many times a loop has run to prevent infinite loops
    keepRunning: false
  };

  constructor(props) {
    super(props);
    this.textAreaRef = React.createRef();
  }

  runOnce = async () => {
    // Save these locally so we only have to do one final setState
    let { metaState, ptr, pc, timeBit, loopStack, loopIterations } = this.state;
    // Select the current instruction
    this.textAreaRef.current.focus();
    this.textAreaRef.current.setSelectionRange(pc, pc + 1);
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
        if (loopIterations >= MAX_LOOP_ITERATIONS) {
          this.reset();
          alert("EXECUTION HALTED to avoid infinite loop.");
          return;
        }
        if (metaState[ptr] == 0) {
          loopStack.shift(); // Remove first element
          loopIterations = 0;
        } else {
          loopIterations += 1;
          pc = loopStack[0]; // Because it'll get 1 added later, and we want to start right after the [
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
        if (this.state.keepRunning) await sleep(timeBit * 1000); // Don't sleep if debugging
        break;
      case ".":
        MIDI.noteOn(0, metaState[ptr], 127, 0);
        MIDI.noteOff(0, metaState[ptr], timeBit);
        if (this.state.keepRunning) await sleep(timeBit * 1000); // Don't sleep if debugging
        break;
    }
    pc += 1;
    await this.setState({
      metaState,
      ptr,
      pc,
      timeBit,
      loopStack,
      loopIterations
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
      loopIterations: 0,
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
            ref={this.textAreaRef}
            value={this.code}
            onKeyUp={event => this.setState({ code: event.target.value })}
          />
        </div>
        <div className="card-footer">
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-success"
              data-toggle="popover"
              data-trigger="hover"
              title="Play / Pause"
              data-content="Start or stop the program running at regular (live) speed."
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
            {/* <button type="button" className="btn btn-dark">
              <i className="fas fa-angle-left" />
            </button> */}
            <button
              type="button"
              className="btn btn-dark"
              data-toggle="popover"
              data-trigger="hover"
              title="Run Once"
              data-content="Run the current instruction and move to the next once,"
              onClick={() => this.runOnce()}
            >
              <i className="fas fa-angle-right" />
            </button>
            {/* <button
              type="button"
              className="btn btn-dark"
              onClick={() => MIDI.noteOn(0, 21, 127, 0)}
            >
              <i className="fas fa-angle-double-right" />
            </button> */}
            <button
              type="button"
              className="btn btn-danger"
              data-toggle="popover"
              data-trigger="hover"
              title="Reset"
              data-content="Zero everything out so you can run your code again."
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
