var React = require('react');
var $ = require('jquery');
var Table = require ('./Table');


var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",];
var hours = ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"];
var sections =["a", "b", "c"];


var App = React.createClass({
  getInitialState: function(){
    return {
      dragStart: 0,
      dragEnd: 0,
      isMouseDown:false,
      isDragging: false,
      range:[]
    }
  },
  rangeMouseDown: function(e) {
    if (this.rightClick(e)) {
      return false;
    } else {
      var allCells = $("#table td");
      this.setState({
        dragEnd:allCells.index(e.target),
        dragStart: allCells.index(e.target),
        isMouseDown: true
      });
      if (typeof e.preventDefault != 'undefined') {
        e.preventDefault();
      }
      document.documentElement.onselectstart = function () { return false; };
    }
  },
  rangeMouseUp: function(e) {
    if (this.rightClick(e)) {
      return false;
    } else {
      var allCells = $("#table td");
      this.setState({
        dragEnd: allCells.index(e.target),
        isDragging: false,
        isMouseDown: false
      });
      if ( this.state.dragEnd != -1) {
        this.selectRange();
      }
      document.documentElement.onselectstart = function () { return true; };
    }
  },
  rangeMouseMove: function(e) {
    if(this.state.isMouseDown) {
      this.setState({
        isDragging:true
      });
    }
    if(this.state.isDragging) {
      var allCells = $("#table td");
      this.setState({
        dragEnd : allCells.index(e.target)
      });
      this.selectRange();
    } else {

      console.log(this.state.dragStart, this.state.dragEnd)
    }
  },

  selectRange: function() {

    if(this.state.dragEnd + 1 < this.state.dragStart){
      $("#table td").slice(this.state.dragEnd, this.state.dragStart +1).addClass('selected');
    } else {
      $("#table td").slice(this.state.dragStart, this.state.dragEnd +1).addClass('selected');
    };
  },
  rightClick: function(e) {
    if (e.which) {
      return (e.which ==3);
    } else if (e.button) {
      return (e.button == 2);
    }
    return false;
  },
  render: function(){
    return(
      <div>
        <Table tdays={days}
              thours={hours}
              tsections={sections}
              moveHandler={this.rangeMouseMove}
              downHandler={this.rangeMouseDown}
              upHandler={this.rangeMouseUp}
              clickHandler={this.rangeMouseClick}
              />
      </div>
    )
  }
});


module.exports = App;
