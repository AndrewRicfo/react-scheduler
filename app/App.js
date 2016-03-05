var React = require('react');
var $ = require('jquery');
var Table = require ('./Table')

var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var hours = ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"];
var sections =["a", "b", "c"];



module.exports = React.createClass({
  getInitialState: function(){
    return {
      dragStart: 0,
      dragEnd: 0,
      isDragging: false,
      oldumu:false
    }
  },
  componentDidMount: function(){
    // var x = document.getElementsByTagName("td");
    // var txt = "";
    // var i;
    // for (i = 0; i < x.length; i++) {
    //     txt = txt + "The index of Cell " + (i + 1) + " is: " + x[i].cellIndex + "<br>";
    // }
    // console.log(txt);
    $("table td")
        .mousedown(this.rangeMouseDown)
        .mouseup(this.rangeMouseUp)
        .mousemove(this.rangeMouseMove)
  },
  rangeMouseDown: function(e) {
    if (this.rightClick(e)) {
      return false;
    } else {
      var allCells = $("#table td");
      this.setState({
        dragStart:allCells.index($(this)),
        isDragging: true
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
        dragEnd: allCells.index($(this)),
        isDragging: false
      });
      if ( this.state.dragEnd != 0) {
        this.selectRange();
      }

      document.documentElement.onselectstart = function () { return true; };
    }
  },
  rangeMouseMove: function(e) {
    if(this.state.isDragging) {
      var allCells = $("#table td");
      this.setState({
        dragEnd : allCells.index($(this))
      });
      this.selectRange();
    }
  },
  selectRange: function() {
    $("#table td").removeClass("selected");
    if(this.state.dragEnd + 1 < this.state.dragStart){
      $("#table td").slice(this.state.dragEnd, this.state.dragStart +1).addClass('selected');
    } else {
      $("#table td").slice(this.state.dragStart, this.state.dragEnd +1).addClass('selected');
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
  rowClickHandler: function(i, x){
    this.setState({
      oldumu:true
    });
  },
  render: function(){
    return(
      <div>
        <Table tdays={days} thours={hours} tsections={sections} clickHandler={this.rowClickHandler}/>
      </div>
    )
  }
})
