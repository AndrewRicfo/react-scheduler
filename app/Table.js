var React = require('react');
var $ = require('jquery');

var Table = React.createClass({
  handleClick: function(i) {
    var allCells= $("#table td");
    console.log(allCells.index(i.target)+1);
    console.log(i.target.id);
    this.props.clickHandler(i);
  },

  render: function(){
    var self = this;
    var _days = this.props.tdays;
    var _hours = this.props.thours;
    var _sections = this.props.tsections;
    var cells =[];
    _hours.map(function(hour, i){
      _sections.map(function(section, k){
        cells.push (hour+"-"+section)
      });
    })
    return(
      <div>
        <table id="table">
          <thead>
            <tr>
              <th></th>
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
                {cells.map(function(cell,i){
                  return(
                    <td id={cell} key={i} onClick={self.handleClick}>{cell}</td>
                  )
                })}
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
})

module.exports = Table
