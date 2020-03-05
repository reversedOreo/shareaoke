import React, { Component } from 'react';
import Switch from 'react-switch';

class FavButton extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    const { checked } = this.state;
    return (
      <div style={{ marginTop: 5 }}>
        <label>
          <span style={{ fontSize: 'large' }}>Favorite</span>
        </label>
        <div>
          <Switch onChange={this.handleChange} checked={checked} />
        </div>
      </div>
    );
  }
}
export default FavButton;
