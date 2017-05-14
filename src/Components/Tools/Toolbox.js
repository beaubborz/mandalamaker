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
      ],
      activeTool: {}
    };
  }

  onToolSelected(event) {
    // locate the tool by name:
    this.state.tools.forEach((elem)=>{
      if(elem.name === event.target.id)
        {
          // Set it as the active tool
          this.setState({
            activeTool: elem
          });
        }
    });
  }

  render() {
    return (
      <div className='Toolbox'>
        <div className='Tools'>
        {this.state.tools.map((tool) => {
          return (<button key={toolKey++}
                          id={tool.name}
                          className={tool.name === this.state.activeTool.name ? 'active' : ''}
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
