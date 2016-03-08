import React from 'react';
import $ from 'jquery';

class Clear extends React.Component {
  constructor(){
    super()
    this.clickHandler = this.clickHandler.bind(this)
  }
  clickHandler(i) {
    this.props.clickHandler(i);
  }
  render(){
    var text ='';
    if (this.props.clearMode){
      text = 'Clear Mode';
      var divStyle = {
        background: '#ff7400'
      };
    } else {
      text = 'Select Mode' ;
      var divStyle = {
        background: '#28B78D'
      };
    }
    return(
      <div>
      Click to change mode:
      <br/>
      <button className="clear-button" onClick={this.clickHandler} style={divStyle}>{text}</button>
      </div>
    )
  }
}
export default Clear
