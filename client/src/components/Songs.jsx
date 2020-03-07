import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import EditButton from './EditButton.jsx';

class Songs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.passUpUriAndPlaySong = this.passUpUriAndPlaySong.bind(this);
  }

  passUpUriAndPlaySong() {
    const { display, song } = this.props;

    display(song);
  }

  render() {
    const { song, edit } = this.props;

    let checkbox = '';

    if (!edit) {
      checkbox = ''
    } else if (edit) {
      checkbox = <EditButton songId={song.id} addSong={this.props.addSong} removeSong={this.props.removeSong} />;
    }
    return (
      <div>
        <ListGroup>
          <ListGroup.Item>
            <Image src={song.imageURL} alt="" height="50" width="50" roundedCircle="true" />
            <button type="button" class="btn btn-link" onClick={this.passUpUriAndPlaySong}>
              {`  ${song.title} by ${song.artist}`}
            </button>
            <div className="form-check float-right">
              {checkbox}
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default Songs;
