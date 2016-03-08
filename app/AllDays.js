import React from 'react';

class AllDays extends React.Component {
  constructor() {
    super();
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }
  handleMouseDown(i) {
    this.props.downHandler(i);
  }
  handleMouseUp(i) {
    this.props.upHandler(i);
  }
  render() {
    return (
      <div>
      <table className={"table"}>
      <tbody>
      <tr>
      <th>all days</th>
        {this.props.row.map((item, i) => {
          let className;
          if (this.props.selectedCells.includes(item)) {
            className = 'selected  + ${item}';
            return (
              <td key={i}
              onMouseDown={this.handleMouseDown}
              onMouseUp={this.handleMouseUp}
              className={className}
              > </td>
            );
          }
          className = item;
          return (
            <td key={i}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            className={className}
            > </td>
          );
        })}
        </tr>
        </tbody>
      </table>
      </div>
    );
  }
}

export default AllDays;
