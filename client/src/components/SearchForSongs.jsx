import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import SpotifyResults from './SpotifyResults.jsx';

class SearchForSongs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: '',
      songData: [],
      searchDisplay: false,
      token: '',
      playlists: [],
      songId: 0,
      playlistId: 0,
      friendData: [],
      friendsPlaylists: [],
      filteredFriendsPlaylists: [],
    };
    this.handleSongNameChange = this.handleSongNameChange.bind(this);
    this.searchSpotifyForSong = this.searchSpotifyForSong.bind(this);
    this.addSongToDatabase = this.addSongToDatabase.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    this.addSongToFriendDatabase = this.addSongToFriendDatabase.bind(this);
  }

  componentDidMount() {
    const { id_user } = this.props.location.state;
    const { friendData, friendsPlaylists } = this.state;

    setTimeout(() => {
      const { username } = this.props;
      axios.get(`/api/user/${username}`)
        .then((data) => axios.get(`/api/playlist/${data.data[0].id}`)
          .then(playlists => this.setState({ playlists: playlists.data })))
        .catch(err => console.error(err));
    }, 125);

    axios.get(`/api/friend/all/${id_user}`)
      .then(data => this.setState({
        friendData: data.data,
      }))
      .then(() => this.state.friendData.forEach(friend => axios.get(`/api/playlist/${friend.id}`).then(friendPlaylist => this.setState({ friendsPlaylists: this.state.friendsPlaylists.concat(friendPlaylist) })).then(() => this.state.friendsPlaylists.forEach(friend => this.setState({ filteredFriendsPlaylists: this.state.filteredFriendsPlaylists.concat(friend.data) })))))
      .catch(err => console.error(err));
  }

  handleSongNameChange(e) {
    this.setState({
      song: e.target.value,
    });
  }

  searchSpotifyForSong() {
    const { song, searchDisplay } = this.state;
    const songQuery = encodeURIComponent(song);

    const { token } = this.props;
    fetch(`https://api.spotify.com/v1/search?q=${songQuery}&type=track&market=US&limit=10`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          songData: data.tracks.items,
          searchDisplay: true,
        });
      });
  }

  addSongToDatabase({ song }, selectedPlaylist) {
    const title = song.name;
    const album = song.album.name;
    const artist = song.album.artists[0].name;
    const imageURL = song.album.images[0].url;
    const uri = song.uri;

    const { playlists } = this.state;

    const correctPlaylist = playlists.filter(e => e.name === selectedPlaylist);
    const correctPlaylistId = correctPlaylist[0].id;

    return axios
      .post('/api/song', { title, album, artist, imageURL, uri })
      .then(axios.get(`/api/song/${title}`)
        .then(data => this.setState({ songId: data.data[0].id }))
        .then(() => this.setState({ playlistId: correctPlaylistId }))
        .then(() => this.addSongToPlaylist()))
      .catch(err => console.error(err));
  }

  addSongToFriendDatabase({ song }, selectedFriendsPlaylist, newFriendsPlaylists) {
    const title = song.name;
    const album = song.album.name;
    const artist = song.album.artists[0].name;
    const imageURL = song.album.images[0].url;
    const uri = song.uri;

    const correctPlaylist = newFriendsPlaylists.filter(e => e.name === selectedFriendsPlaylist);
    const correctPlaylistId = correctPlaylist[0].id;

    return axios
      .post('/api/song', { title, album, artist, imageURL, uri })
      .then(axios.get(`/api/song/${title}`)
        .then(data => this.setState({ songId: data.data[0].id }))
        .then(() => this.setState({ playlistId: correctPlaylistId }))
        .then(() => this.addSongToPlaylist()))
      .catch(err => console.error(err));
  }

  addSongToPlaylist() {
    const { playlistId, songId } = this.state;

    return axios
      .post(`/api/playlist/${playlistId}/${songId}`)
      .then(response => console.log('Added song to playlist!', response))
      .catch(err => console.error(err));
  }

  render() {
    const { song, songData, searchDisplay, playlists, filteredFriendsPlaylists } = this.state;

    return (
      <div>
        <Breadcrumb style={{ marginLeft: 150, marginRight: 150 }}>
          <Breadcrumb.Item>
            <Link to="/main">
              Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={{
              pathname: '/createplaylist',
              state: {
                id_user: this.props.location.state.id_user,
                username: this.props.location.state.username,
              },
            }}
            >
                Create playlist
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Search</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={{
              pathname: '/playlists',
              state: {
                id_user: this.props.location.state.id_user,
                username: this.props.location.state.username,
              },
            }}
            >
              Playlists
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={{
              pathname: '/friends',
              state: {
                id_user: this.props.location.state.id_user,
                username: this.props.location.state.username,
              },
            }}
            >
                Friends
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: 'orange', marginLeft: 150, marginRight: 150, padding: 0, height: 65 }}>
          <h1 style={{ fontSize: 30, color: 'white', marginLeft: 40, textAlign: 'center' }}>Add songs to your playlists</h1>
        </div>
        <div style={{ height: 1200, background: '#ebeef2', marginLeft: 150, marginRight: 150, paddingTop: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <input style={{ border: '2px solid green', outline: 'none', marginRight: 5 }} value={song} onChange={this.handleSongNameChange} />
            <Button variant="success" size="sm" onClick={this.searchSpotifyForSong} type="button">Search</Button>
          </div>
          <div style={{ padding: 20 }}>
            {searchDisplay ? <SpotifyResults friendsPlaylists={filteredFriendsPlaylists} playlists={playlists} songData={songData} addFriendSong={this.addSongToFriendDatabase} addSong={this.addSongToDatabase} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchForSongs;
