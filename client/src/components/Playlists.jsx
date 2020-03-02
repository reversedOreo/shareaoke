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
    };
  }

  componentDidMount() {
    const { id_user } = this.props.location.state;

    console.log("GOKU", id_user);

    axios.get(`/api/playlist/${id_user}`)
      .then(playlists => this.setState({ playlists: playlists.data }))
      .catch(err => console.error(err));
  }


  render() {
    const { playlists } = this.state;
    const { username } = this.props.location.state;

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
          <Breadcrumb.Item>
            <Link to={{
              pathname: '/search',
              state: {
                id_user: this.props.location.state.id_user,
                username: this.props.location.state.username,
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
          <h3 style={{ fontSize: 50, color: 'white', marginLeft: 35 }}>{`${username}'s playlists`}</h3>
        </div>
        <div style={{ height: 1200, background: '#ebeef2', marginLeft: 150, marginRight: 150, paddingTop: 20, display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
          {playlists.map(playlist => <PlaylistSongs username={this.props.location.state.username} id_user={this.props.location.state.id_user} playlist={playlist} />)}
        </div>
      </div>
    );
  }
}

export default Playlists;
