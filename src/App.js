import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slice from './Components/Slice/Slice';

class App extends Component {
  constructor() {
    super();
    this.state = {
      slices: [],
    };
  }

  addSlice() {
    const newSlices = this.state.slices.concat([{key: this.state.slices.length}]);
    this.setState({slices: newSlices});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Mandala maker</h2>
        </div>

        <div className="container">
          <div className="sliceList col-3">
          {console.log(this.state.slices)}
            {this.state.slices.map((elem) => {
              return (<Slice key={this.key} />);
            })}
            <button onClick={this.addSlice.bind(this)}>Click me buddy!</button>
          </div>
          <div className="canvas col-6">
          canvas
          </div>
          <div className="toolbox col-3">
            toolbox
          </div>
        </div>
      </div>
    );
  }
}

export default App;
