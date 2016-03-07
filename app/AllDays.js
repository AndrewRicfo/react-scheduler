var React = require('react');
var $ = require('jquery');

var AllDays = React.createClass({
  handleMouseDown: function(i) {
    this.props.downHandler(i)
  },
  handleMouseUp: function(i) {
    this.props.upHandler(i)
  },
  render: function() {
    var self = this;
    var _row = this.props.row;
    return (
      <ul className="all-days">
        <p className="all-days-title">all days</p>
        {_row.map(function(item,i){
          return(
            <li key={i}
            onMouseDown={self.handleMouseDown}
            onMouseUp={self.handleMouseUp}
            className={item}
            > </li>
          )
        })}
      </ul>
    )
  }
})

module.exports = AllDays;
