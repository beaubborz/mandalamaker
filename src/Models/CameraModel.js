
const CameraModel = {
  create: (x = 0, y = 0, zoom = 100) => {
    return {
      x, y, zoom,
      // This function transforms a point's location based on the camera region
      transform: (x, y)=>{
        return {
          x: (x - this.x) * zoom/100.0,
          y: (y - this.y) * zoom/100.0
        }
      }
    };
  },

  clone: (camera) => {
    return CameraModel.create(camera.x, camera.y, camera.zoom);
  }
};

export default CameraModel;
