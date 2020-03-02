/* eslint-disable max-len */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Friend from './Friend.jsx';

class FriendsList extends React.Component {
  setFriends(title, users, buttonMessage, buttonFunction, buttonMessage2, buttonFunction2, message) {
    return (
      <div>
        <h3>{title}</h3>
        {!users.length && <h5>{message}</h5>}
        {!!users.length
          && (
            <div>
              {users.map((user) => {
                return (
                  <div key={user.id}>
                    <div>{user.username}</div>
                    {buttonMessage && <Button variant="success" size="sm" onClick={() => buttonFunction(user.id)}>{buttonMessage}</Button>}
                    {buttonMessage2 && <Button variant="danger" size="sm" onClick={() => buttonFunction2(user.id)}>{buttonMessage2}</Button>}
                  </div>
                );
              })}
            </div>
          )
        }
      </div>
    );
  }

  render() {
    const {
      friends,
      received,
      sent,
      accept,
      remove,
      playlists,
      username,
    } = this.props;

    const receivedMessage = 'No received requests pending.';
    const sentMessage = 'No sent requests pending.';
    return (
      <div>
        <h3>{`${username}'s Friends`}</h3>
        {!friends.length && <h5>Nope. No friends here.</h5>}
        <div>{friends.map(friend => (<Friend key={friend.id} friend={friend} remove={remove} playlists={playlists} />))}</div>
        <div>{this.setFriends('Received', received, 'Accept', accept, 'Decline', remove, receivedMessage)}</div>
        <div>{this.setFriends('Sent', sent, null, null, 'Cancel', remove, sentMessage)}</div>
      </div>
    );
  }
}

export default FriendsList;
