var React = require('react');
var $ = require('jquery');
let ClickOutHandler = require('react-onclickout');

var Table = React.createClass({
  handleMouseMove: function(i) {
    this.props.moveHandler(i);
  },
  handleMouseUp: function(i) {
    this.props.upHandler(i);
  },
  handleMouseDown: function(i) {
    this.props.downHandler(i);
  },
  handleMouseClick: function(i) {
    this.props.clickHandler(i)
  },
  render: function(){
    var self = this;
    var _days = this.props.days;
    var _hours = this.props.hours;
    var _row = this.props.row;
    var _selectedCells = this.props.selectedCells;

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
                      onMouseMove={self.handleMouseMove}
                      onMouseDown={self.handleMouseDown}
                      onMouseUp={self.handleMouseUp}
                      onMouseClick={self.handleMouseClick}
                      className={className}></td>
                    )
                  }else{
                    var className =day +" "+cell;
                    return(
                      <td id={cell+day} key={i}
                      onMouseMove={self.handleMouseMove}
                      onMouseDown={self.handleMouseDown}
                      onMouseUp={self.handleMouseUp}
                      onMouseClick={self.handleMouseClick}
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
})

module.exports = Table
