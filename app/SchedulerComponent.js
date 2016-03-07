var React = require('react');
var $ = require('jquery');
var Table = require ('./Table');
var AllDay = require ('./AllDay');
var AllDays = require ('./AllDays');


const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",];
const hours = ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"];
const sections =["a", "b", "c"];
const row = [];

hours.map(function(hour, i){
  sections.map(function(section, k){
    row.push (hour+"-"+section)
  });
})

var SchedulerComponent = React.createClass({
  getInitialState: function(){
    return {
      dragStart: null,
      dragEnd: null,
      isMouseDown:false,
      isDragging: false,
      selectedCells:[]

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
    }
  },

  selectRange: function() {
    var self = this;
    var list =[];
    var filteredList=[];
    var addList = [];

    if (this.state.dragEnd != null && this.state.dragStart != null){
      if(this.state.dragEnd + 1 < this.state.dragStart){
        list =$(".table td").slice(this.state.dragEnd, this.state.dragStart +1);
        filteredList = list.filter(function(index){
          var result = self.state.selectedCells.indexOf(list[index].id)===(-1);
          return result
        }).toArray()
        addList = filteredList.map(function(item,index){
          return item.id
        });

        this.setState({
          selectedCells: this.state.selectedCells.concat(addList)
        })
      } else {
        list =$(".table td").slice(this.state.dragStart, this.state.dragEnd +1);
        filteredList = list.filter(function(index){
          var result = self.state.selectedCells.indexOf(list[index].id)===(-1);
          return result
        }).toArray();
        addList = filteredList.map(function(item,index){
          return item.id
        });

        this.setState({
          selectedCells: this.state.selectedCells.concat(addList)
        })
      }
    }

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
  setAllDays: function (i) {
    var list =[];
    list = days.map(function(item){
      return i.target.className+item;
    });
    this.setState({
      selectedCells: this.state.selectedCells.concat(list)
    })
  },
  render: function(){
    return(
      <div className="scheduler-container">
        <Table days={days}
              hours={hours}
              row={row}
              moveHandler={this.rangeMouseMove}
              downHandler={this.rangeMouseDown}
              upHandler={this.rangeMouseUp}
              clickHandler={this.rangeMouseClick}
              selectedCells = {this.state.selectedCells}
              />
          <AllDay days={days} downHandler={this.setAllDay}  upHandler={this.selectRange}/>
          <div className="clear"></div>
          <AllDays row={row} downHandler={this.setAllDays}  upHandler={this.selectRange} />
      </div>
    )
  }
});


module.exports = SchedulerComponent;
