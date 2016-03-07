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
    var _days = this.props.adays;
    return (
      <ul className="all-day">
        <p className="all-day-title">all day</p>
        {_days.map(function(item,i){
          return(
            <li key={i}
            onMouseDown={self.handleMouseDown}
            onMouseUp={self.handleMouseUp}
            className={item}
            ></li>
          )
        })}
      </ul>
    )
  }
})

module.exports = AllDay;
