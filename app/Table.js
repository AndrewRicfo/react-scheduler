var React = require('react');
var $ = require('jquery');
let ClickOutHandler = require('react-onclickout');


// class Table extends React.Component {
//   handleMouseDown(i) {
//     this.props.downHandler(i);
//   }
//   handleMouseClick(i) {
//     this.props.clickHandler(i)
//   }
//   handleMouseUp(i) {
//     this.props.upHandler(i);
//   }
//   handleMouseMove(i) {
//     this.props.moveHandler(i);
//   }
//   onClickOut(e) {
//     alert('user clicked outside of the component!');
//   }
//
//   render() {
//     var self = this;
//     var _days = this.props.tdays;
//     var _hours = this.props.thours;
//     var _sections = this.props.tsections;
//     var cells =[];
//     _hours.map(function(hour, i){
//       _sections.map(function(section, k){
//         cells.push (hour+"-"+section)
//       });
//     });
//     return (
//       <div>
//         <table id="table">
//           <thead>
//             <tr>
//               <th></th>
//               {_hours.map(function(hour, i){
//                 return(
//                   <th colSpan="3" key={i}>{hour}</th>
//                 )
//               })}
//             </tr>
//           </thead>
//           <tbody>
//           {_days.map(function(day,i){
//             return (
//               <tr className={day} key={i}>
//                 <th>{day}</th>
//                 {cells.map(function(cell,i){
//                   return(
//                     <td id={cell} key={i}
//                     onMouseMove={self.handleMouseMove}
//                     onMouseDown={self.handleMouseDown}
//                     onMouseUp={self.handleMouseUp}
//                     onMouseClick={self.handleMouseClick}>{cell}</td>
//                   )
//                 })}
//               </tr>
//             )
//           })}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }
// export default Table;


var Table = React.createClass({
  handleMouseMove: function(i) {
    this.props.moveHandler(i);
  },
  handleMouseUp: function(i) {
    this.props.upHandler(i);
  },
  handleMouseDown: function(i) {
    this.props.downHandler(i);
  },
  handleMouseClick: function(i) {
    this.props.clickHandler(i)
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
                    <td id={cell} key={i}
                    onMouseMove={self.handleMouseMove}
                    onMouseDown={self.handleMouseDown}
                    onMouseUp={self.handleMouseUp}
                    onMouseClick={self.handleMouseClick}>{cell}</td>
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
