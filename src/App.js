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
      activeSlice: {},
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
    let newSlice = Object.assign({}, this.state.slices[idx]);
    newSlice.divider = divider;
    const slices = [...this.state.slices.slice(0, idx), newSlice, ...this.state.slices.slice(idx + 1)];
    this.setState({
      slices
    });
  }

  onSetEditing(editIndex) {
    let slices = [];
    let activeSlice = {};
    this.state.slices.forEach((sliceModel, index) => {
      let newSlice = SliceModel.clone(sliceModel);

      if(index === editIndex) {
        newSlice.isEditing = !newSlice.isEditing;
        newSlice.isShown = true;
        activeSlice = newSlice;
      }
      else {
        newSlice.isEditing = false;
      }
      slices.push(newSlice);
    });

    this.setState({
      slices,
      activeSlice
    });
  }

  onToggleView(viewIndex) {
    let slices = [];
    this.state.slices.forEach((sliceModel, index) => {
      let newSlice = SliceModel.clone(sliceModel);
      if (index === viewIndex && !sliceModel.isEditing)
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
                return (<Slice key={elem.key} index={idx} sliceModel={elem}
                          onDividerChanged={this.onDividerChanged.bind(this)}
                          onToggleView={this.onToggleView.bind(this)}
                          onSetEditing={this.onSetEditing.bind(this)}
                          onRemoveSlice={this.onRemoveSlice.bind(this)} />);
              })}
            </div>
            <button onClick={this.addSlice.bind(this)}>Add a slice</button>
          </div>
          <Preview activeSlice={this.state.activeSlice} />
          <div className="toolbox">
            toolbox
          </div>
        </div>
      </div>
    );
  }
}

export default App;
