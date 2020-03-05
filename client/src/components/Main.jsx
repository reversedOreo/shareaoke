import React from 'react';
import { ReactFileReader } from 'react-file-reader'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
//import { Request } from 'request';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  
  }
  render() {
    const { username, token, id_user } = this.props;
    return (
      <div>
        <div style={{ background: 'orange', marginLeft: 150, marginRight: 150, padding: 0, height: 65 }}>
          <h1 style={{ color: 'white', fontSize: 35, display: 'inline-block', marginLeft: 40 }}>Shareaoke</h1>
          <h1 style={{ textAlign: 'center', color: 'white', marginLeft: 125, fontSize: 50, display: 'inline-block' }}>{username}</h1>
        </div>
        <div style={{height: 600, background: '#ebeef2', marginLeft: 150, marginRight: 150, paddingTop: 20 }}>
          <ul style={{ listStyleType: 'none' }}>
            <li style={{ paddingBottom: 10 }}>
              <Link to={{ pathname: '/createplaylist', state: { username, token, id_user } }}>
                <Button variant="success">
                  Create a playlist
                </Button>
              </Link>
            </li>
            <li style={{ paddingBottom: 10 }}>
              <Link to={{ pathname: '/search', state: { username, id_user } }}>
                <Button variant="success">
                  Search for songs to add to playlist
                </Button>
              </Link>
            </li>
            <li style={{ paddingBottom: 10 }}>
              <Link to={{ pathname: '/playlists', state: { username, id_user } }}>
                <Button variant="success">
                  Playlists
                </Button>
              </Link>
            </li>
            <li style={{ paddingBottom: 10 }}>
              <Link to={{ pathname: '/friends', state: { username, id_user } }}>
                <Button variant="success">
                  Friends
                </Button>
              </Link>
            </li>
            <li style={{ paddingBottom: 10 }}>
              <Link to={{ pathname: '/chart', state: { username, token, id_user } }}>
                <Button variant="success">
                  chart
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Main;
