import React, { Component } from "react";

export default class BootstrapTwoColumnLayout extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div
            className={
              this.props.showSidebar ? "col-sm-7 p-4" : "col-sm-12 p-4"
            }
          >
            {this.props.children}
          </div>
          {this.props.showSidebar ? (
            <div className="col-sm-5 bg-secondary p-4 text-white">
              {this.props.sidebar}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
