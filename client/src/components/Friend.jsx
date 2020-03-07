/* eslint-disable max-len */
import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlaylist: false,
      friendPlaylists: [],
      isFaved: null,
    };
    this.handleShowPlaylists = this.handleShowPlaylists.bind(this);
    this.checkIfFavorited = this.checkIfFavorited.bind(this);
  }

  componentDidMount() {
    this.setFriendsPlaylists();
  }

  setFriendsPlaylists() {
    const { friend } = this.props;
    axios.get(`/api/playlist/${friend.id}`)
      .then((p) => p.data)
      .then(playlists => {
        this.setState({
          friendPlaylists: playlists,
        });
      })
      .catch((err) => console.error(err));
  }

  handleShowPlaylists() {
    const { showPlaylist } = this.state;
    this.setState({
      showPlaylist: !showPlaylist,
    });
  }

  checkIfFavorited(playlist) {
    // const { playlist } = this.state;
    const { userId } = this.props;
    axios.get(`/api/favorite/isfavorited/${userId}/${playlist.id}`)
      .then((res) => {
        return res.data;
      })
      .catch(err => console.error(err));
  }

  render() {
    const { friend, remove, userId } = this.props;
    const { showPlaylist, friendPlaylists, isFaved } = this.state;
    return (
      <div>
        <div>{friend.username}</div>
        <Button variant="success" size="sm" onClick={this.handleShowPlaylists}>See Playlists</Button>
        <Button variant="danger" size="sm" onClick={() => remove(friend.id)}>Remove Friend</Button>
        <div>{showPlaylist && friendPlaylists.map((playlist) => {
          return (
            <div key={playlist.id}>
              <Link
                to={{
                  pathname: '/playlist',
                  state: {
                    isFaved,
                    id_user: userId,
                    friend: true,
                    playlist,
                  },
                }}
              >
              <li data-playlist={playlist.id} data-friend={friend.id} onClick={this.handleFriendPlaylistClick}>{playlist.name}</li>
              </Link>
            </div>
          )})}
        </div>
      </div>
    );
  }
}

export default Friend;
