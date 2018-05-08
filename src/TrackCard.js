import React, { Component } from "react";

export default class TrackCard extends Component {
  render() {
    return (
      <div className="card bg-secondary text-white">
        <div className="card-header table-responsive">
          <table className="table table-bordered table-sm text-center mb-0">
            <tbody>
              <tr>
                {Array.apply(null, Array(30)).map((val, i) => (
                  <td key={i} classNameName={i == 0 ? "bg-dark" : ""}>
                    0
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-body">
          <textarea
            className="bg-dark text-white p-2"
            style={{
              boxSizing: "border-box",
              width: "100%",
              letterSpacing: "3px"
            }}
          />
        </div>
        <div className="card-footer">
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-success">
              <i className="fas fa-play" />
            </button>
            <button type="button" className="btn btn-dark">
              <i className="fas fa-angle-left" />
            </button>
            <button type="button" className="btn btn-dark">
              <i className="fas fa-angle-right" />
            </button>
            <button type="button" className="btn btn-dark">
              <i className="fas fa-angle-double-right" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
