import React from 'react';
import $ from 'jquery';

class Table extends React.Component{
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }
  handleMouseMove(i) {
    this.props.moveHandler(i);
  }
  handleMouseUp(i) {
    this.props.upHandler(i);
  }
  handleMouseDown(i) {
    this.props.downHandler(i);
  }
  handleMouseClick(i) {
    this.props.clickHandler(i);
  }
  render(){
    return(
        <table className="table main-table">
          <thead>
            <tr>
              <th>Hours</th>
              { this.props.hours.map((hour, i)=>{
                return(
                  <th colSpan="3" key={i}>{hour}</th>
                )
              })}
            </tr>
          </thead>
          <tbody>
          {this.props.days.map((day,i)=>{

            return (
              <tr className={day} key={i}>
                <th>{day}</th>
                {this.props.row.map((cell,i)=>{
                  if(this.props.selectedCells.includes(cell+day)){
                    var className ="selected"+ " "+ day +" "+cell;
                    return(
                      <td id={cell+day} key={i}
                      onMouseMove={this.handleMouseMove}
                      onMouseDown={this.handleMouseDown}
                      onMouseUp={this.handleMouseUp}
                      onClick={this.handleMouseClick}
                      className={className}></td>
                    )
                  }else{
                    var className =day +" "+cell;
                    return(
                      <td id={cell+day} key={i}
                      onMouseMove={this.handleMouseMove}
                      onMouseDown={this.handleMouseDown}
                      onMouseUp={this.handleMouseUp}
                      onClick={this.handleMouseClick}
                      className={className}></td>
                    )
                  }

                })}
              </tr>
            )
          })}
          </tbody>
        </table>
    )
  }
};
export default Table;
