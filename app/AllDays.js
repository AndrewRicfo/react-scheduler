var React = require('react');
var $ = require('jquery');

class AllDays extends React.Component{
  handleMouseDown(i) {
    this.props.downHandler(i)
  }
  handleMouseUp(i) {
    this.props.upHandler(i)
  }
  render() {
    var self = this;
    var _row = this.props.row;
    var _selectedCells = this.props.selectedCells;
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
              onMouseDown={self.handleMouseDown}
              onMouseUp={self.handleMouseUp}
              className={className}
              > </td>
            )
          }else {
            var className = item;
            return(
              <td key={i}
              onMouseDown={self.handleMouseDown}
              onMouseUp={self.handleMouseUp}
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
