import React, { Component } from 'react';
import LineTool from './LineTool/LineTool';
import './Toolbox.css';

let toolKey = 0;

class Toolbox extends Component {

  constructor() {
    super();
    this.state = {
      tools: [
        LineTool.create()
      ]
    };
  }

  onToolSelected(event) {
    let activeTool = {};
    // locate the tool by name:
    this.state.tools.forEach((elem)=>{
      if(elem.name === event.target.id)
        {
          activeTool = elem;
        }
    });
    this.props.onToolSelected(activeTool);
  }

  render() {
    return (
      <div className='Toolbox'>
        <div className='Tools'>
        {this.state.tools.map((tool) => {
          return (<button key={toolKey++}
                          id={tool.name}
                          className={tool.name === this.props.activeTool.name ? 'active' : ''}
                          onClick={this.onToolSelected.bind(this)}>
                  </button>);
        })}
        </div>
        <div className='ToolSettings'>
        </div>
      </div>
    );
  };
}

export default Toolbox;
