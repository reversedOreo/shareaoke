const { Router } = require('express');
const {
  postFavorite,
  deleteFavorite,
  getFavorites,
  checkIfFavorited,
} = require('../db/index');

const favRouter = Router();

favRouter.post('/', (req, res) => {
  const { userId, playlistId } = req.body;
  postFavorite(userId, playlistId)
    .then(() => {
      res.send(`user: ${userId} favorited playlist: ${playlistId}`);
    })
    .catch(() => {
      res.send(`error user: ${userId} favoriting playlist: ${playlistId}`);
    });
});

favRouter.delete('/', (req, res) => {
  const { userId, playlistId } = req.body;
  deleteFavorite(userId, playlistId)
    .then(() => {
      res.send(`user: ${userId} unfavorited playlist: ${playlistId}`);
    })
    .catch(() => {
      res.send(`error user: ${userId} unfavoriting playlist: ${playlistId}`);
    });
});

favRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  getFavorites(id)
    .then((playlist) => {
      res.send(playlist);
    })
    .catch(() => {
      res.send('error getting favorited playlist');
    });
});

favRouter.get('/isfavorited/:userid/:playlistid', (req, res) => {
  const { userid, playlistid } = req.params;
  checkIfFavorited(userid, playlistid)
    .then((favStatus) => {
      if (favStatus.length) {
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch(() => {
      res.send('error checking favorite status');
    });
});

module.exports = {
  favRouter,
};
