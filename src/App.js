import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slice from './Components/Slice/Slice';
import SliceModel from './Models/SliceModel';
import Preview from './Components/Preview/Preview';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sliceKey: 0, // Generate a unique key ID for slices
      slices: [],
      activeSliceIndex: null,
    };
  }

  addSlice() {
    const sliceKey = this.state.sliceKey + 1;
    const slices = [...this.state.slices, SliceModel.create(sliceKey)];

    this.setState({
      sliceKey,
      slices
    });
  }

  onDividerChanged(idx, divider) {
    let newSlice = SliceModel.clone(this.state.slices[idx]);
    newSlice.divider = parseInt(divider, 10);
    const slices = [...this.state.slices.slice(0, idx), newSlice, ...this.state.slices.slice(idx + 1)];
    this.setState({
      slices
    });
  }

  onSetEditing(activeSliceIndex) {
    this.setState({
      activeSliceIndex
    });
  }

  onToggleView(viewIndex) {
    let slices = [];
    this.state.slices.forEach((sliceModel, index) => {
      let newSlice = SliceModel.clone(sliceModel);
      if (index === viewIndex && viewIndex !== this.state.activeSliceIndex)
        newSlice.isShown = !newSlice.isShown;
      slices.push(newSlice);
    });

    this.setState({
      slices
    });
  }

  onRemoveSlice(idx) {
    const slices = [...this.state.slices.slice(0, idx), ...this.state.slices.slice(idx + 1)];
    this.setState({
      slices
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Mandala maker</h2>
        </div>

        <div className="container">
          <div className="sliceList">
            <div>
              {this.state.slices.map((elem, idx) => {
                return (<Slice
                          key={elem.key}
                          index={idx}
                          sliceModel={elem}
                          isActive={idx === this.state.activeSliceIndex}
                          onDividerChanged={this.onDividerChanged.bind(this)}
                          onToggleView={this.onToggleView.bind(this)}
                          onSetEditing={this.onSetEditing.bind(this)}
                          onRemoveSlice={this.onRemoveSlice.bind(this)} />);
              })}
            </div>
            <button onClick={this.addSlice.bind(this)}>Add a slice</button>
          </div>
          <Preview activeSlice={this.state.activeSliceIndex !== null ? this.state.slices[this.state.activeSliceIndex] : {}} />
          <div className="toolbox">
            toolbox
          </div>
        </div>
      </div>
    );
  }
}

export default App;
