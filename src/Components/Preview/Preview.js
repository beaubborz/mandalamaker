import React, { Component } from 'react';

// The width and height of the canvas (Resolution, not actual size on the page)
const SIZE = 1000;
// The minimum radius length for which the cirle completely fills the canvas
const RADIUS = Math.sqrt((SIZE*SIZE) + (SIZE*SIZE));

class Preview extends Component {

  componentDidMount() {
      this.updateCanvas();
  }

  componentDidUpdate() {
        this.updateCanvas();
  }

  updateCanvas() {
      const ctx = this.refs.canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0,0, SIZE, SIZE);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0,0, SIZE, SIZE);

      this.drawEditableAreaOverlay(ctx);
  }

    // This function will draw a gray overlay to identify the area in which the user can draw.
  drawEditableAreaOverlay(ctx) {
    // do not draw any area if we are not editing at all.
    if(this.props.activeSlice === {})
      return;
    // if divider is 1, there is no area to draw.
    if(this.props.activeSlice.divider <= 1)
      return;

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.moveTo(SIZE/2, SIZE/2);
    ctx.lineTo(SIZE/2, SIZE/2 - RADIUS);
    ctx.arc(SIZE/2, SIZE/2, RADIUS, 1.5*Math.PI, (2*Math.PI/this.props.activeSlice.divider) - (Math.PI/2), true);
    ctx.fill();
  }

   // This function checks if the x and y passed in parameter are inside the editable area
  pointIsInEditableArea(x, y) {
    let slice = this.props.activeSlice;

    // Point is never in editable area if we are not editing at all
    if(!slice.isEditing)
      return false;

    // TODO: replace with actual angle management with divider from the active slice
    return (x <= y);
  }

  render() {
    return (
      <canvas ref="canvas" width={SIZE} height={SIZE}></canvas>
    );
  }

}

export default Preview;
