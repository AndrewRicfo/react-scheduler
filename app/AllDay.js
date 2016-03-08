import React from 'react';
import $ from 'jquery';

class AllDay extends React.Component{
  constructor() {
    super();
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }
  handleMouseDown(i) {
    this.props.downHandler(i)
  }
  handleMouseUp(i) {
    this.props.upHandler(i)
  }
  render() {
    var self = this;
    var _days = this.props.days;
    var _selectedCells = this.props.selectedCells;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>all day</th>
          </tr>
        </thead>
        <tbody>
          {_days.map((item,i)=>{
            if(_selectedCells.includes(item)){
              var className = "selected"+" "+item;
              return(
                <tr key={i}>
                  <td onMouseDown={self.handleMouseDown}
                      onMouseUp={self.handleMouseUp}
                      className={className}>
                  </td>
                </tr>
              )
            }else {
              var className = item;
              return(
                <tr key={i}>
                  <td onMouseDown={self.handleMouseDown}
                      onMouseUp={self.handleMouseUp}
                      className={className}>
                  </td>
                </tr>)
              }
          })}
        </tbody>
      </table>
    )
  }
};

export default AllDay
