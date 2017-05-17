import React, { Component } from 'react';
import './History.css'

// Command history for do/undo
class History extends Component {

  render() {
    return (
      <div className='History'>
      <h3>History: </h3>
      {this.props.commandStack.reverse().map((command, idx)=>{
        const reverseIdx = (this.props.commandStack.length - idx - 1);
        return (
          <div className={reverseIdx === this.props.lastCommand ? 'active' : ''}>{command.name}</div>
        );
      })}
      </div>
    );
  }
}

export default History;
