import React from 'react';
import $ from 'jquery';

class Table extends React.Component{
  constructor() {
    super();
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  handleMouseMove(i) {
    this.props.moveHandler(i);
  }
  handleMouseUp(i) {
    this.props.upHandler(i);
  }
  handleMouseDown(i) {
    this.props.downHandler(i);
  }
  handleMouseClick(i) {
    this.props.clickHandler(i)
  }
  render(){
    var _days = this.props.days;
    var _hours = this.props.hours;
    var _row = this.props.row;
    var _selectedCells = this.props.selectedCells;
    var _handleMouseMove = this.handleMouseMove;
    var _handleMouseUp = this.handleMouseUp;
    var _handleMouseDown = this.handleMouseDown;
    var _handleMouseClick = this.handleMouseClick;
    return(
        <table className="table">
          <thead>
            <tr>
              <th>Hours</th>
              {_hours.map(function(hour, i){

                return(
                  <th colSpan="3" key={i}>{hour}</th>
                )
              })}
            </tr>
          </thead>
          <tbody>
          {_days.map(function(day,i){

            return (
              <tr className={day} key={i}>
                <th>{day}</th>
                {_row.map(function(cell,i){

                  if(_selectedCells.includes(cell+day)){
                    var className ="selected"+ " "+ day +" "+cell;

                    return(
                      <td id={cell+day} key={i}
                      onMouseMove={_handleMouseMove}
                      onMouseDown={_handleMouseDown}
                      onMouseUp={_handleMouseUp}
                      onMouseClick={_handleMouseClick}
                      className={className}></td>
                    )
                  }else{
                    var className =day +" "+cell;
                    return(
                      <td id={cell+day} key={i}
                      onMouseMove={_handleMouseMove}
                      onMouseDown={_handleMouseDown}
                      onMouseUp={_handleMouseUp}
                      onMouseClick={_handleMouseClick}
                      className={className}></td>
                    )
                  }

                })}
              </tr>
            )
          })}
          </tbody>
        </table>
    )
  }
};
export default Table;
