import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Slice.css'

class Slice extends Component {
  static propTypes = {text: PropTypes.string};
  static defaultProps = {text: 'PropTypes.string'};

  render() {
    return (
      <div className="slice">
        {this.props.text}
      </div>
    );
  }
}

export default Slice;
