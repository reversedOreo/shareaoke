const { Router } = require('express');
const {
  addPlaylist,
  deletePlaylist,
  removeSongFromPlaylist,
  addSongToPlaylist,
  showUserPlaylist,
  showPlaylistSongs,
  getPlaylist,
} = require('../db');

const playlistRouter = Router();

// Add playlist
playlistRouter.post('/', (req, res) => {
  const {
    id_user,
    playlistName,
    description,
  } = req.body;
  addPlaylist(id_user, playlistName, description)
    .then(() => {
      console.log('Playlist added to database!');
      res.status(201).send('Playlist created successfully!');
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Add song to playlist
playlistRouter.post('/:id_playlist/:id_song', (req, res) => {
  const { id_playlist, id_song } = req.params;

  addSongToPlaylist(id_playlist, id_song)
    .then(() => {
      console.log('Song successfully added to playlist!');
      res.status(201).send('Song successfully added to playlist!');
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// delete playlist
playlistRouter.delete('/:id_playlist', (req, res) => {
  const { id_playlist } = req.params;

  deletePlaylist(id_playlist)
    .then(() => {
      console.log('Playlist successfully deleted!');
      res.status(201).send('Playlist successfully deleted!');
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// remove song from playlist
playlistRouter.delete('/:id_playlist/:id_song', (req, res) => {
  const { id_playlist, id_song } = req.params;

  removeSongFromPlaylist(id_playlist, id_song)
    .then(() => {
      console.log('Song successfully deleted from playlist!');
      res.status(201).send('Song successfully deleted from to playlist!');
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Show a users playlists
playlistRouter.get('/:id_user', (req, res) => {
  showUserPlaylist(req.params.id_user)
    .then((playlists) => {
      res.send(playlists);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Show a users songs from playlist
playlistRouter.get('/songs/:id_playlist', (req, res) => {
  showPlaylistSongs(req.params.id_playlist)
    .then((songs) => {
      res.send(songs);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

playlistRouter.get('/getplaylist/:playlistid', (req, res) => {
  getPlaylist(req.params.playlistid)
    .then((playlist) => {
      res.send(playlist);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = {
  playlistRouter,
};
