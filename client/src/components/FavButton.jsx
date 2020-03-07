import React, { Component } from 'react';
import Switch from 'react-switch';
import axios from 'axios';

class FavButton extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.isFaved };
    this.handleChange = this.handleChange.bind(this);
    this.handleFavSwitchOn = this.handleFavSwitchOn.bind(this);
    this.handleFavSwitchOff = this.handleFavSwitchOff.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    if (checked) {
      this.handleFavSwitchOn();
    } else {
      this.handleFavSwitchOff();
    }
  }

  handleFavSwitchOn() {
    const { playlistId, userId } = this.props;
    axios.post('/api/favorite', { playlistId, userId })
      .then((res) => {
        console.log(res.data);
      })
      .catch(err => console.error(err));
  }

  handleFavSwitchOff() {
    const { playlistId, userId } = this.props;
    axios.delete('/api/favorite', { data: { playlistId, userId } })
      .then((res) => {
        console.log(res.data);
      })
      .catch(err => console.error(err));
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
