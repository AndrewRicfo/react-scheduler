var React = require('react');
var $ = require('jquery');
var Table = require ('./Table');
var AllDay = require ('./AllDay');


var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",];
var hours = ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"];
var sections =["a", "b", "c"];


var SchedulerComponent = React.createClass({
  getInitialState: function(){
    return {
      dragStart: null,
      dragEnd: null,
      isMouseDown:false,
      isDragging: false,
      range:[]
    }
  },
  rangeMouseDown: function(e) {
    if (this.rightClick(e)) {
      return false;
    } else {
      var allCells = $(".table td");
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
      var allCells = $(".table td");
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
      var allCells = $(".table td");
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
      $(".table td").slice(this.state.dragEnd, this.state.dragStart +1).addClass('selected');
    } else {
      $(".table td").slice(this.state.dragStart, this.state.dragEnd +1).addClass('selected');
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
  setAllDay: function(i) {

    switch (i.target.className) {
      case 'Monday':
      this.setState({
        dragEnd:0,
        dragStart:23
      });
      break;
      case 'Tuesday':
      this.setState({
        dragEnd:24,
        dragStart:47
      });
      break;
      case 'Wednesday':
      this.setState({
        dragEnd:48,
        dragStart:71
      });
      break;
      case 'Thursday':
      this.setState({
        dragEnd:72,
        dragStart:95
      });
      break;
      case 'Friday':
      this.setState({
        dragEnd:96,
        dragStart:119
      });
      break;
      case 'Saturday':
      this.setState({
        dragEnd:120,
        dragStart:143
      });
      break;
      case 'Sunday':
      this.setState({
        dragEnd:144,
        dragStart:167
      });
      break;
    }


  },
  selectAllDay: function (i){
    this.selectRange();
  },
  render: function(){
    return(
      <div className="scheduler-container">
        <Table tdays={days}
              thours={hours}
              tsections={sections}
              moveHandler={this.rangeMouseMove}
              downHandler={this.rangeMouseDown}
              upHandler={this.rangeMouseUp}
              clickHandler={this.rangeMouseClick}
              />
          <AllDay adays={days} downHandler={this.setAllDay}  upHandler={this.selectAllDay}/>
      </div>
    )
  }
});


module.exports = SchedulerComponent;
