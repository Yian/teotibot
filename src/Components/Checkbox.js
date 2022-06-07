import React from "react";
export class Checkbox extends React.Component {
  render() {
    return (
      <label className={`checkbox-item`}>
        <input
          name={this.props.label}
          type="checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
        <span>{this.props.label}</span>
      </label>
    );
  }
}
