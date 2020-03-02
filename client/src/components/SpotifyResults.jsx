import React from 'react';
import SingleSpotifySong from './SingleSpotifySong.jsx';

class SpotifyResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { songData, addSong, playlists, friendsPlaylists, addFriendSong } = this.props;

    return (
      <div>
        {songData.map(song => (
          <SingleSpotifySong
            friendsPlaylists={friendsPlaylists}
            playlists={playlists}
            song={song}
            key={song.id}
            addSong={addSong}
            addFriendSong={addFriendSong}
          />
        ))}
      </div>
    );
  }
}

export default SpotifyResults;
