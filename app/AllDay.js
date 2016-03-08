import React from 'react';

class AllDay extends React.Component {
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
      <table className="table">
        <thead>
          <tr>
            <th>all day</th>
          </tr>
        </thead>
        <tbody>
          {this.props.days.map((item, i) => {
            let className;
            if (this.props.selectedCells.includes(item)) {
              className = 'selected +${item}';
              return (
                <tr key={i}>
                  <td onMouseDown={this.handleMouseDown}
                      onMouseUp={this.handleMouseUp}
                      className={className}>
                  </td>
                </tr>
              );
            }
            className = item;
            return (
              <tr key={i}>
                <td onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    className={className}>
                </td>
              </tr>);
          })}
        </tbody>
      </table>
    );
  }
}

export default AllDay;
