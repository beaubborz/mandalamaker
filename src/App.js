import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Helpers from './Helpers';
import Slice from './Components/Slice/Slice';
import SliceModel from './Models/SliceModel';
import Preview from './Components/Preview/Preview';
import Toolbox from './Components/Tools/Toolbox';
import History from './Components/History/History';

let sliceKey = 0;

class App extends Component {
  constructor() {
    super();
    this.state = {
      slices: [],
      activeSliceIndex: null,
      activeTool: {},
      commandStack: [], // used for do/undo of commands
      lastCommand: 0, // index of the last command to be run (or the command to undo)
    };
  }

  addSlice() {
    const slices = [...this.state.slices, SliceModel.create(sliceKey++)];

    this.setState({
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
    // adjust the active slice index now that one of the slice was removed.
    let activeSliceIndex = this.state.activeSliceIndex;
    if(idx < this.state.activeSliceIndex)
      activeSliceIndex--;
    else if(idx === this.state.activeSliceIndex)
      activeSliceIndex = null;

    this.setState({
      slices,
      activeSliceIndex
    });
  }

  onToolSelected(tool) {
    this.setState({
      activeTool: tool
    });
  }

  onToolUsed() {
    if(!Helpers.isEmptyObject(this.state.activeTool))
    {
      const commandStack = [...this.state.commandStack.slice(0, this.state.lastCommand + 1), this.state.activeTool.getCommand()];
      const lastCommand = Math.max(0, commandStack.length - 1);
      this.setState({
        commandStack,
        lastCommand
      });
      commandStack[lastCommand].do();
    }
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
          <Preview activeSlice={this.state.activeSliceIndex !== null ? this.state.slices[this.state.activeSliceIndex] : {}}
                   onToolUsed={this.onToolUsed.bind(this)} />
          <Toolbox activeTool={this.state.activeTool}
                   onToolSelected={this.onToolSelected.bind(this)} />
          <History commandStack={this.state.commandStack}
                   lastCommand={this.state.lastCommand}/>
        </div>
      </div>
    );
  }
}

export default App;
