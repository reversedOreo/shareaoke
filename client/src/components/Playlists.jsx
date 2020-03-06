import React from 'react';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import PlaylistSongs from './PlaylistSongs.jsx';


class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      favPlaylists: [],
    };
    this.getFavPlaylist = this.getFavPlaylist.bind(this);
  }

  componentDidMount() {
    const { id_user } = this.props.location.state;
    axios.get(`/api/playlist/${id_user}`)
      .then((playlists) => {
        this.setState({ playlists: playlists.data });
        this.getFavPlaylist();
      })
      .catch(err => console.error(err));
  }

  getFavPlaylist() {
    const { id_user } = this.props.location.state;
    axios.get(`/api/favorite/${id_user}`)
      .then((playlists) => {
        this.setState({ favPlaylists: playlists.data });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { playlists, favPlaylists } = this.state;
    const { username } = this.props.location.state;
    const { id_user } = this.props.location.state;

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
                id_user,
                username,
              },
            }}
            >
                Create playlist
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={{
              pathname: '/search',
              state: {
                id_user,
                username,
              },
            }}
            >
                Search
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Playlists</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={{
              pathname: '/friends',
              state: {
                id_user,
                username,
              },
            }}
            >
                Friends
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: 'orange', marginLeft: 150, marginRight: 150, padding: 0, height: 65 }}>
          <h3 style={{ fontSize: 50, color: 'white', marginLeft: 35 }}>{`${username}'s playlists`}</h3>
        </div>
        <div style={{ height: 1200, background: '#ebeef2', marginLeft: 150, marginRight: 150, paddingTop: 20, display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
          {playlists.map(playlist => <PlaylistSongs username={username} id_user={id_user} playlist={playlist} />)}
          {/* only render if looking at user playlist not friend's */}
          {favPlaylists.map(playlist => <PlaylistSongs username={username} id_user={id_user} playlist={playlist} />)}
        </div>
      </div>
    );
  }
}

export default Playlists;
