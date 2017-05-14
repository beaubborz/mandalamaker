import React, { Component } from 'react';
import './Slice.css'

class Slice extends Component {

  onDividerChanged(event) {
    this.props.onDividerChanged(this.props.index, event.target.value);
  }

  onSetEditing() {
    this.props.onSetEditing(this.props.index);
  }

  onToggleView() {
    this.props.onToggleView(this.props.index);
  }

  onRemoveSlice() {
    this.props.onRemoveSlice(this.props.index);
  }

  render() {
    return (
      <div className={"slice " + (this.props.isActive ? "active" : "")}>
        <h3>Slice {this.props.index + 1}</h3>
        <div>
          <span>Divider: </span>
          <input type="number" className="divider" min="1" defaultValue={this.props.sliceModel.divider} onChange={this.onDividerChanged.bind(this)} />
        </div>
        <div className="buttons">
          <button className={"showhide " + (this.props.sliceModel.isShown ? "shown" : "hidden")}  onClick={this.onToggleView.bind(this)} />
          <button className="edit" onClick={this.onSetEditing.bind(this)} />
          <button className="remove" onClick={this.onRemoveSlice.bind(this)} />
        </div>
      </div>
    );
  }

}

export default Slice;
