import React, { Component } from 'react';
import './Slice.css'

class Slice extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="slice">
        {this.props.index}
      </div>
    );
  }

}

export default Slice;
