import React, { Component } from 'react';

const SIZE = 200;

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
    if(!this.props.activeSlice.isEditing)
      return;

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    for(let i=0; i<SIZE;i++)
      for(let j=0; j<SIZE; j++)
        if(this.pointIsInEditableArea(i, j))
          ctx.fillRect(i, j, 1, 1);
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
