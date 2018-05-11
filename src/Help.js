import React, { Component } from "react";
import DemoPlayer from "./DemoPlayer";

export default class Help extends Component {
  render() {
    return (
      <div>
        <h3 className="mb-3">Demo Player</h3>
        <DemoPlayer channel={0} />
        <h3 className="mt-3">Introduction</h3>
      </div>
    );
  }
}
