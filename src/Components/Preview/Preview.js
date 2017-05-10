import React, { Component } from 'react';

class Preview extends Component {

  componentDidMount() {
      this.updateCanvas();
  }

  updateCanvas() {
      const ctx = this.refs.canvas.getContext('2d');
      ctx.fillStyle = 'blue';
      ctx.fillRect(0,0, 1000, 1000);
  }

  render() {
    return (
      <canvas ref="canvas" width="1000" height="1000"></canvas>
    );
  }

}

export default Preview;
