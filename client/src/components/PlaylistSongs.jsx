import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import FavButton from './FavButton.jsx';

class PlaylistSongs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      isFaved: null,
    };
    this.checkIfFavorited = this.checkIfFavorited.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.playlist;

    axios.get(`/api/playlist/songs/${id}`)
      .then(data => this.setState({
        image: data.data[0].imageURL,
      }));
    this.checkIfFavorited();
  }

  checkIfFavorited() {
    const { id_user, playlist } = this.props;
    axios.get(`/api/favorite/isfavorited/${id_user}/${playlist.id}`)
      .then((res) => {
        this.setState({ isFaved: res.data });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { playlist, username, id_user } = this.props;
    const { image, isFaved } = this.state;

    return (
      <Card style={{ width: '15rem', height: '25rem', marginRight: 10, marginLeft: 10, border: 'black' }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{playlist.name}</Card.Title>
          <Card.Text>{playlist.description}</Card.Text>
          <Button variant="success">
            <Link
              style={{ color: 'white' }}
              to={{
                pathname: '/playlist',
                state: {
                  isFaved,
                  friend: this.props.friend,
                  playlist,
                  username,
                  id_user,
                },
              }}
            > {playlist.name}
            </Link>
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default PlaylistSongs;
