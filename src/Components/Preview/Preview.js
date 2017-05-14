import React, { Component } from 'react';
import CameraModel from '../../Models/CameraModel';

// The width and height of the canvas (Resolution, not actual size on the page)
const SIZE = 600;
// The minimum radius length for which the cirle completely fills the canvas
const RADIUS = Math.sqrt((SIZE*SIZE) + (SIZE*SIZE));

// number of zoom percentage level each tick of wheel is worth
const ZOOM_SPEED = 10;

class Preview extends Component {

  constructor() {
    super();
    this.state = {
      camera: CameraModel.create()
    };
  }

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
      this.drawZoomStats(ctx);
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

  // This function shows the zoom stats in the bottom right corner of the canvas
  drawZoomStats(ctx) {
    const fontSize = 15;
    ctx.font = fontSize + "px Arial";
    const zoomStats = "X: " + this.state.camera.x + " Y: " + this.state.camera.y + " Zoom: " + (this.state.camera.zoom) + "%";
    ctx.fillStyle = 'black';
    ctx.fillText(zoomStats, SIZE - (fontSize/2 * zoomStats.length) ,SIZE - fontSize);
  }

  adjustZoom(event) {
    let camera = CameraModel.clone(this.state.camera);
    camera.zoom += ((event.deltaY < 0 ? 1 : -1) * ZOOM_SPEED);
    this.setState({
      camera
    });
  }

  render() {
    return (
      <canvas ref="canvas" width={SIZE} height={SIZE} style={{width:SIZE, height:SIZE}} onWheel={this.adjustZoom.bind(this)}></canvas>
    );
  }

}

export default Preview;
