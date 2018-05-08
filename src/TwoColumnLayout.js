import React, { Component } from "react";

export default class TwoColumnLayout extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className={this.props.showSidebar ? "col-sm-8 p-4" : "p-4"}>
            {this.props.children}
          </div>
          {this.props.showSidebar ? this.props.sidebar : null}
        </div>
      </div>
    );
  }
}
