import React, { Component } from "react";

export default class BootstrapTabPills extends Component {
  render() {
    return (
      <div>
        <ul className="nav nav-pills mb-3" role="tablist">
          {this.props.titles.map((title, i) => (
            <li className="nav-item" key={i}>
              <a
                className={`nav-link text-white ${i === 0 ? "active" : ""}`}
                data-toggle="pill"
                href={`#pills-${title}`}
                role="tab"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
        <div className="tab-content">
          {this.props.content.map((content, i) => (
            <div
              key={i}
              className={`tab-pane fade show ${i === 0 ? "active" : ""}`}
              id={`pills-${this.props.titles[i]}`}
              role="tabpanel"
            >
              {content}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
