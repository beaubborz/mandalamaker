import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slice from './Components/Slice/Slice';

class App extends Component {
  constructor() {
    super();
    this.state = {slices: []};
  }

  addSlice() {
    const slices = this.state.slices.push(new Slice());
    this.setState({slices});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Mandala maker</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div id='slices'>
        {this.state.slices}
        </div>
        <button onClick={this.addSlice.bind(this)}>Click me buddy!</button>
      </div>
    );
  }
}

export default App;
