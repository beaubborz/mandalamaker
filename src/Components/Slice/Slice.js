import React, { Component } from 'react';
import './Slice.css'

class Slice extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  onDividerChanged(event) {
    this.props.onDividerChanged(this.props.index, event.target.value);
  }

  render() {
  //  debugger
    return (
      <div className="slice">
        <h3>Slice {this.props.index + 1}</h3>
        <div><span>Divider: </span><input type="number" defaultValue={this.props.sliceModel.divider} onChange={this.onDividerChanged.bind(this)} /></div>
        <div><button className="showhide shown" /><button className="edit" /><button className="remove" /></div>
      </div>
    );
  }

}

export default Slice;
