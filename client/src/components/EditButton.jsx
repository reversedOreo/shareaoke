import React, { Component } from 'react';
import Switch from 'react-switch';

class EditButton extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked, event, id) {
    const { addSong, removeSong } = this.props
    this.state.checked = checked;
    if (this.state.checked) {
      // add song to playlist editSongs state
      addSong(id);
    }
    if (!this.state.checked) {
      // remove song from playlist editSongs state
      removeSong(id);
    }
  }


  render() {
    const { checked } = this.state;
    return (
      <div style={{ marginTop: 5 }}>
        <div>
          <Switch onChange={this.handleChange} checked={checked} id={this.props.songId} />
        </div>
      </div>
    );
  }
}
export default EditButton;
