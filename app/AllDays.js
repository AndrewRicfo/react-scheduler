import React from 'react';
import $ from 'jquery';

class AllDays extends React.Component{
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
    var _row = this.props.row;
    var _selectedCells = this.props.selectedCells;
    var _handleMouseDown = this.handleMouseDown;
    var _handleMouseUp = this.handleMouseUp;
    return (
      <div>
      <table className="table">
      <tbody>
      <tr>
      <th>all days</th>
        {_row.map(function(item,i){
          if (_selectedCells.includes(item)){
            var className ="selected" +" "+item;
            console.log(item);
            return(
              <td key={i}
              onMouseDown={_handleMouseDown}
              onMouseUp={_handleMouseUp}
              className={className}
              > </td>
            )
          }else {
            var className = item;
            return(
              <td key={i}
              onMouseDown={_handleMouseDown}
              onMouseUp={_handleMouseUp}
              className={className}
              > </td>
            )
          }
        })}
        </tr>
        </tbody>
      </table>
      </div>
    )
  }
};

export default AllDays;
