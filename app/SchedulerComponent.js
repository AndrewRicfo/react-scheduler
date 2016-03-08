import React from 'react';
import $ from 'jquery';
import Table from './Table';
import AllDay from './AllDay';
import AllDays from './AllDays';
import Clear from './Clear';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours = ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'];
const sections = ['a', 'b', 'c'];
const row = [];

hours.map((hour) =>
  sections.map((section) =>
    row.push(hour + '-' + section)
  )
);

class SchedulerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.rangeMouseDown = this.rangeMouseDown.bind(this);
    this.rangeMouseUp = this.rangeMouseUp.bind(this);
    this.rangeMouseMove = this.rangeMouseMove.bind(this);
    this.setAllDays = this.setAllDays.bind(this);
    this.setAllDay = this.setAllDay.bind(this);
    this.selectRange = this.selectRange.bind(this);
    this.deleteCell = this.deleteCell.bind(this);
    this.Clear = this.Clear.bind(this);
    this.state = {
      dragStart: null,
      dragEnd: null,
      isMouseDown: false,
      isDragging: false,
      selectedCells: [],
      clearMode: false,
    };
  }
  rangeMouseDown(e) {
    const allCells = $('.table td');
    if (!this.state.clearMode) {
      if (this.rightClick(e)) {
        return false;
      }
      this.setState({
        dragEnd: allCells.index(e.target),
        dragStart: allCells.index(e.target),
        isMouseDown: true,
      });
      if (typeof e.preventDefault !== 'undefined') {
        e.preventDefault();
      }
      document.documentElement.onselectstart = function () { return false; };
    }
  }
  rangeMouseUp(e) {
    if (!this.state.clearMode) {
      if (this.rightClick(e)) {
        return false;
      }
      const allCells = $('.table td');
      this.setState({
        dragEnd: allCells.index(e.target),
        isDragging: false,
        isMouseDown: false,
      });
      if (this.state.dragEnd !== -1) {
        this.selectRange();
      }
      document.documentElement.onselectstart = function () { return true; };
    }
  }
  rangeMouseMove(e) {
    if (!this.state.clearMode) {
      if (this.state.isMouseDown) {
        this.setState({
          isDragging: true,
        });
      }
      if (this.state.isDragging) {
        const allCells = $('.table td');
        this.setState({
          dragEnd: allCells.index(e.target),
        });
        this.selectRange();
      }
    }
  }
  selectRange() {
    let list = [];
    let filteredList = [];
    let addList = [];
    if (this.state.dragEnd !== null && this.state.dragStart !== null) {
      if (this.state.dragEnd + 1 < this.state.dragStart) {
        list = $('.table td').slice(this.state.dragEnd, this.state.dragStart + 1);
        filteredList = list.filter((index) =>
          this.state.selectedCells.indexOf(list[index].id) === (-1)
        ).toArray();
        addList = filteredList.map((item) =>
          item.id
        );
        this.setState({
          selectedCells: this.state.selectedCells.concat(addList),
        });
      } else {
        list = $('.table td').slice(this.state.dragStart, this.state.dragEnd + 1);
        filteredList = list.filter((index) =>
          this.state.selectedCells.indexOf(list[index].id) === (-1)
        ).toArray();
        addList = filteredList.map((item) =>
          item.id
        );
        this.setState({
          selectedCells: this.state.selectedCells.concat(addList),
        });
      }
    }
  }
  rightClick(e) {
    if (e.which) {
      return (e.which === 3);
    } else if (e.button) {
      return (e.button === 2);
    }
    return false;
  }
  setAllDay(i) {
    let list = [];
    list = row.map((item) => item + i.target.className);
    list.push(i.target.className);
    this.setState({
      selectedCells: this.state.selectedCells.concat(list),
    });
  }
  setAllDays(i) {
    let list = [];
    list = days.map((item) => i.target.className + item);
    list.push(i.target.className);
    this.setState({
      selectedCells: this.state.selectedCells.concat(list),
    });
  }
  Clear() {
    if (this.state.clearMode) {
      this.setState({
        clearMode: false,
      });
    } else {
      this.setState({
        clearMode: true,
      });
    }
  }
  deleteCell(e) {
    if (this.state.clearMode) {
      const list = this.state.selectedCells.slice();
      if (this.state.selectedCells.includes(e.target.id)) {
        list.splice(this.state.selectedCells.indexOf(e.target.id), 1);
        this.setState({
          selectedCells: list,
        });
      }
    }
  }
  render() {
    return (
      <div className={'scheduler-container'}>
        <Clear clickHandler= {this.Clear} clearMode={this.state.clearMode}/>
        <Table days={days}
                hours={hours}
                row={row}
                moveHandler={this.rangeMouseMove}
                downHandler={this.rangeMouseDown}
                upHandler={this.rangeMouseUp}
                selectedCells = {this.state.selectedCells}
                clickHandler = {this.deleteCell}/>
        <AllDay days={days}
                downHandler={this.setAllDay}
                upHandler={this.selectRange}
                selectedCells = {this.state.selectedCells}/>
        <div className={'clear'}></div>
        <AllDays row={row}
                downHandler={this.setAllDays}
                upHandler={this.selectRange}
                selectedCells = {this.state.selectedCells}/>
      </div>
    );
  }
}
export default SchedulerComponent;
