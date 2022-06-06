import React from "react";
export class Checkbox extends React.Component {
  render() {
    return (
      <label className={`checkbox-item ${this.props.className}`}>
        <input
          name={this.props.label}
          type="checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
        {this.props.label}
      </label>
    );
  }
}
