import React, { Component } from "react";
import DemoPlayer from "./DemoPlayer";

export default class Help extends Component {
  instructions = {
    "<":
      "Move the pointer to the left. If the pointer is on the first cell, wrap around to the last one.",
    ">":
      "Move the pointer to the right. If the pointer is on the last cell, wrap around to the first one.",
    "+":
      "Increase the number at the current cell. If the number is 255, wrap around to 0.",
    "-":
      "Decrease the number at the current cell. If the number is 0, wrap around to 255.",
    "^": "Increase the time bit by 0.25.",
    v: "Decrease the time bit by 0.25.",
    ".":
      "Play the note corresponding to the number in the current cell for the time specified in the time bit. Check out the Demo Player to see which number refers to which note.",
    ",":
      "Pause execution of the program for the time specified in the time bit.",
    "[": "Open a loop.",
    "]":
      "Closes a loop. If the number at the current cell defined by the pointer is 0, go to the next instruction. Otherwise, loop back to the opening bracket."
  };

  render() {
    return (
      <div>
        <h3 className="mb-3">Demo Player</h3>
        <DemoPlayer channel={0} />
        <h3 className="mt-3">Introduction</h3>
        <div className="p-1">
          <p>Welcome to Brainsynth!</p>
          <p>
            Your goal is to make music using the Brainsynth programming
            language. Here's a quick overview.
          </p>
          <p>
            Most of what you're going to be doing is modifying <b>state</b>.
            That's the strip of cells holding zeroes at the top. The{" "}
            <b>current cell</b> is the one that's highlighted right now. It's
            determined by the <b>pointer</b> - moving the pointer changes the
            current cell. Putting certain numbers in the current cell is how you
            can choose which note to play. You can move to different cells to
            store different numbers which makes it easier to play different
            notes.
          </p>
          <p>
            You may have noticed one cell that is disconnected from all the
            others on the left. That's the <b>time bit</b>. The time bit affects
            how long a note gets played as well as how long a delay lasts. The
            time bit can be changed in quarter second increments (0.25).
          </p>
          <p>
            Brainsynth gives you 10 instructions to work with. They are listed
            here:
          </p>
          <ul>
            {Object.keys(this.instructions).map((key, i) => (
              <li key={i}>
                <b>{key}</b> = {this.instructions[key]}
              </li>
            ))}
          </ul>
          <p>Enjoy!</p>
          <img
            src="http://engr.uconn.edu/~and15102/smugandi.png"
            alt="Smug. Andi."
          />
        </div>
      </div>
    );
  }
}
