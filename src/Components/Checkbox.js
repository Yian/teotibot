import React from "react";
export class Checkbox extends React.Component {
  render() {
    return (
      <label className={`checkbox-item ${this.props.className}`}>
        {this.props.label}
        <input
          name={this.props.label}
          type="checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
      </label>
    );
  }
}
