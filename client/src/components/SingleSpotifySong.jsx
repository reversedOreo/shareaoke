import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

class SingleSpotifySong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      selectedPlaylist: {},
      newFriendsPlaylists: [],
    };

    this.addSongToDatabase = this.addSongToDatabase.bind(this);
    this.addSongToFriend = this.addSongToFriend.bind(this);
  }

  componentDidMount() {
    const { friendsPlaylists } = this.props;

    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };

    this.setState({
      newFriendsPlaylists: friendsPlaylists.filter(unique),
    });
  }

  addSongToDatabase() {
    const { song, addSong } = this.props;
    const selectedPlaylist = document.getElementById('list').value;

    this.setState({
      display: true,
      selectedPlaylist,
    });

    addSong({ song }, selectedPlaylist);
  }

  addSongToFriend() {
    const { song, addFriendSong } = this.props;
    const { newFriendsPlaylists } = this.state;
    const selectedFriendsPlaylist = document.getElementById('friendList').value;

    addFriendSong({ song }, selectedFriendsPlaylist, newFriendsPlaylists);
  }

  render() {
    const { song, playlists } = this.props;
    const { display, selectedPlaylist, newFriendsPlaylists } = this.state;

    return (
      <div>
        <ListGroup>
          <ListGroup.Item>
            <Image src={song.album.images[0].url} alt="" height="75" width="75" roundedCircle="true" />
            {`  ${song.name} by ${song.album.artists[0].name}`}
            <Button style={{ marginLeft: 10 }} variant="success" size="sm" onClick={this.addSongToDatabase}>Add to playlist</Button>
            <select style={{ height: 30, backgroundColor: 'DodgerBlue', border: 'none', color: 'white' }} id="list">
              {playlists.map(playlist => (
                <option value={playlist.name}>{playlist.name}</option>
              ))}
            </select>
            {display ? <h5>{`${song.name} added to ${selectedPlaylist}`}</h5> : null}
            <Button style={{ marginLeft: 10 }} variant="success" size="sm" onClick={this.addSongToFriend}>Add to friends playlist</Button>
            <select style={{ height: 30, backgroundColor: 'DodgerBlue', border: 'none', color: 'white' }} id="friendList">
              {newFriendsPlaylists.map(playlist => (
                <option value={playlist.name}>{playlist.name}</option>
              ))}
            </select>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default SingleSpotifySong;
