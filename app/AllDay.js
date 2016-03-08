var React = require('react');
var $ = require('jquery');

var AllDay = React.createClass({
  handleMouseDown: function(i) {
    this.props.downHandler(i)
  },
  handleMouseUp: function(i) {
    this.props.upHandler(i)
  },
  render: function() {
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
          {_days.map(function(item,i){
            if(_selectedCells.includes(item)){
              var className = "selected"+" "+item;
              console.log(className);
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
})

module.exports = AllDay;
