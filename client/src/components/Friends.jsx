/* eslint-disable react/no-unused-state */
/* eslint-disable no-alert */
import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import FriendsList from './FriendsList.jsx';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendSearchInput: '',
      allFriends: [],
      sentFriendRequests: [],
      receivedFriendRequests: [],
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSetFriends = this.handleSetFriends.bind(this);
    this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.handleSetFriends();
    }, 125);
  }

  getFriends() {
    this.handleGetFriends('all', 'allFriends');
  }

  getReceivedRequests() {
    this.handleGetFriends('received', 'receivedFriendRequests');
  }

  getSentRequests() {
    this.handleGetFriends('sent', 'sentFriendRequests');
  }

  handleSetFriends() {
    this.getFriends();
    this.getReceivedRequests();
    this.getSentRequests();
  }

  handleGetFriends(route, change) {
    const { id_user } = this.props;
    axios.get(`/api/friend/${route}/${id_user}`)
      .then(friend => {
        this.setState({
          [change]: friend.data,
        });
      })
      .catch((err) => console.error(err));
  }

  removeFriend(id_remove) {
    const { id_user } = this.props;
    axios.delete(`/api/friend/remove/${id_user}/${id_remove}`)
      .then(() => { this.handleSetFriends(); })
      .catch((err) => console.error(err));
  }

  acceptFriendRequest(id_sender) {
    const { id_user } = this.props;
    axios.patch(`/api/friend/accept/${id_sender}/${id_user}`)
      .then(() => { this.handleSetFriends(); })
      .catch((err) => console.error(err));
  }

  sendRequest(friend) {
    const { id_user } = this.props;
    // get user from database
    axios.get(`/api/user/${friend}`)
      .then((user) => {
        // dont let users add themselves
        if (user.data[0].id === id_user) {
          alert('Sadly you can not be friends with yourself');
        } else {
          axios.get(`/api/friend/check/request/${id_user}/${user.data[0].id}`)
            .then(request => {
              if (request.data.length) {
                alert('A request for this user already exists');
              } else {
                // send a friend request
                axios.post(`/api/friend/request/${id_user}/${user.data[0].id}`)
                  .then(() => {
                    // tell the user a friend request was sent
                    alert('Request sent!');
                    // get sent requests immediately after
                    this.handleSetFriends();
                  })
                  .catch((err) => console.error(err));
              }
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  }

  handleInput(e) {
    this.setState({
      friendSearchInput: e.target.value,
    });
  }

  handleClick() {
    const { friendSearchInput } = this.state;
    this.sendRequest(friendSearchInput);
  }

  render() {
    const {
      allFriends,
      receivedFriendRequests,
      sentFriendRequests,
    } = this.state;

    const { username } = this.props;

    return (
      <div>
        <div style={{ background: 'orange', marginLeft: 150, marginRight: 150, padding: 0, height: 65 }}>
          <h1 style={{ fontSize: 45, color: 'white', marginLeft: 40, textAlign: 'center' }}>Friends</h1>
        </div>
        <div style={{ height: 1200, background: '#ebeef2', marginLeft: 150, marginRight: 150, paddingTop: 20 }}>
          <div style={{ marginLeft: 15 }}>
            <div>
              <input onChange={this.handleInput} />
              <Button size="sm" onClick={this.handleClick}>Add Friend</Button>
            </div>
            <FriendsList
              username={username}
              friends={allFriends}
              received={receivedFriendRequests}
              sent={sentFriendRequests}
              accept={this.acceptFriendRequest}
              remove={this.removeFriend}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Friend;
