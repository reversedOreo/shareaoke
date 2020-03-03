const { Router } = require('express');
const { postFavorite, deleteFavorite, getFavorites } = require('../db/index');

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

favRouter.get('/', (req, res) => {
  const { userId } = req.body;
  getFavorites(userId)
    .then((playlist) => {
      res.send(playlist);
    })
    .catch(() => {
      res.send('error getting favorited playlist');
      console.log('test git');
    });
});

module.exports = {
  favRouter,
};
