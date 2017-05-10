import React, { Component } from 'react';
import './Slice.css'

class Slice extends Component {

  onDividerChanged(event) {
    this.props.onDividerChanged(this.props.index, event.target.value);
  }

  onSetEditing() {
    this.props.onSetEditing(this.props.index);
  }

  render() {
    return (
      <div className={"slice " + (this.props.sliceModel.isEditing ? "active" : "")}>
        <h3>Slice {this.props.index + 1}</h3>
        <div>
          <span>Divider: </span>
          <input type="number" className="divider" defaultValue={this.props.sliceModel.divider} onChange={this.onDividerChanged.bind(this)} />
        </div>
        <div className="buttons">
          <button className={"showhide " + (this.props.sliceModel.isShown ? "shown" : "hidden")} />
          <button className="edit" onClick={this.onSetEditing.bind(this)} />
          <button className="remove" />
        </div>
      </div>
    );
  }

}

export default Slice;
