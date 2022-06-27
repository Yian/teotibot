/** @jsx jsx */
import { jsx } from "@emotion/react";
import Tippy from "@tippyjs/react";
import React from "react";
import { checkboxTooltip, checkbox } from "./Checkbox.css";

export class Checkbox extends React.Component {
  render() {
    return (
      <div css={checkbox}>
        <label className={`checkbox-item`}>
          <input
            name={this.props.label}
            type="checkbox"
            checked={this.props.checked}
            onChange={this.props.onChange}
          />
          <span>{this.props.label}</span>
        </label>

        {this.props.withTooltip && (
          <Tippy content={this.props.withTooltip}>
            <span css={checkboxTooltip}>?</span>
          </Tippy>
        )}
      </div>
    );
  }
}
