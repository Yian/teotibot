import React from "react";

export class IncomeTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: [
        { color: "red", income: 0 },
        { color: "blue", income: 0 },
        { color: "green", income: 0 },
        { color: "yellow", income: 0 },
        { color: "black", income: 0 }
      ]
    };
  }

  incrementIncome() {}

  decrementIncome() {}

  render() {
    return (
      <div>
        <ul>
          {this.state.incomes.map(income => (
            <li>
              <div>{income.color}</div>
              <div>{income.income}</div>
              <div>Increase</div>
              <div>Decrease</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
