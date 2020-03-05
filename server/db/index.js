const mysql = require('mysql');
const util = require('util');

const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASS = '';
const DB_NAME = 'shareaoke';

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

const query = util.promisify(connection.query).bind(connection);

connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database connected!');
  }
});


// users
const createUser = (username) => {
  const mysqlQuery = 'INSERT INTO user VALUES(null, ?);';
  return query(mysqlQuery, [username]);
};

const findUser = (username) => {
  const mysqlQuery = 'SELECT * FROM user WHERE username = ?;';
  return query(mysqlQuery, [username]);
  // .then(data => data[0]);
};

// songs
const addSong = (title, album, artist, imageURL, uri) => {
  const mysqlQuery = 'INSERT INTO song VALUES(null, ?, ?, ?, ?, ?);';
  return query(mysqlQuery, [title, album, artist, imageURL, uri]);
};

const findSong = (title) => {
  const mysqlQuery = 'SELECT * FROM song WHERE title = ?;';
  return query(mysqlQuery, [title]);
};

// playlists
const addPlaylist = (id_user, name, description) => {
  const mysqlQuery = 'INSERT INTO playlist VALUES(null, ?, ?, ?);';
  return query(mysqlQuery, [id_user, name, description]);
};

const deletePlaylist = (id) => {
  const mysqlQuery1 = 'DELETE FROM playlist_song WHERE id_playlist = ?;';
  const mysqlQuery2 = 'DELETE FROM playlist WHERE id = ?;';
  return query(mysqlQuery1, [id])
    .then(() => {
      query(mysqlQuery2, [id]);
    });
};

const addSongToPlaylist = (id_playlist, id_song) => {
  const mysqlQuery = 'INSERT INTO playlist_song VALUES(null, ?, ?);';
  return query(mysqlQuery, [id_playlist, id_song]);
};

const removeSongFromPlaylist = (id_playlist, id_song) => {
  const mysqlQuery = 'DELETE FROM playlist_song WHERE id_playlist = ? AND id_song = ?;';
  return query(mysqlQuery, [id_playlist, id_song]);
};

const showUserPlaylist = (id_user) => {
  const mysqlQuery = 'SELECT * FROM playlist WHERE id_user = ?;';
  return query(mysqlQuery, [id_user]);
};

const showPlaylistSongs = (id_playlist) => {
  const mysqlQuery = `
    SELECT song.id, song.title, song.album, song.artist, song.imageURL, song.uri
    FROM playlist_song
    INNER JOIN song
    ON song.id = playlist_song.id_song
    WHERE playlist_song.id_playlist = ?;`;
  return query(mysqlQuery, [id_playlist]);
};

// friends
const sendFriendRequest = (id_sender, id_recipient) => {
  const mysqlQuery = 'INSERT INTO friend VALUES(null, ?, ?, ?);';
  return query(mysqlQuery, [id_sender, id_recipient, 0]);
};

const acceptFriendRequest = (id_sender, id_recipient) => {
  const mysqlQuery = 'UPDATE friend SET status = 1 WHERE id_sender = ? AND id_recipient = ?;';
  return query(mysqlQuery, [id_sender, id_recipient]);
};

// Used for both declining and removing friends
const removeFriend = (id_sender, id_recipient) => {
  const mysqlQuery = 'DELETE FROM friend WHERE id_sender = ? AND id_recipient = ?;';
  return query(mysqlQuery, [id_sender, id_recipient])
    .then(() => query(mysqlQuery, [id_recipient, id_sender]));
};

const showFriends = (id) => {
  const mysqlQuery = `
    Select * FROM
    (
      SELECT user.username, user.id
      FROM friend
      INNER JOIN user
      ON user.id = friend.id_recipient
      WHERE friend.id_sender = ?
      AND status = 1
      UNION
      SELECT user.username, user.id
      FROM friend
      INNER JOIN user
      ON user.id = friend.id_sender
      WHERE friend.id_recipient = ?
      AND status = 1
    )
    AS all_friends
    ORDER BY username;`;
  return query(mysqlQuery, [id, id]);
};

const showSentRequests = (id) => {
  const mysqlQuery = `
    SELECT * FROM
    (
      SELECT user.username, user.id
      FROM friend
      INNER JOIN user
      ON user.id = friend.id_recipient
      WHERE friend.id_sender = ?
      AND status = 0
    )
    AS all_sent
    ORDER BY username;`;
  return query(mysqlQuery, [id, id]);
};

const showReceivedRequests = (id) => {
  const mysqlQuery = `
    SELECT * FROM
    (
      SELECT user.username, user.id
      FROM friend
      INNER JOIN user
      ON user.id = friend.id_sender
      WHERE friend.id_recipient = ?
      AND status = 0
    )
    AS all_received
    ORDER BY username;`;
  return query(mysqlQuery, [id, id]);
};

const checkPendingRequests = (id_sender, id_recipient) => {
  const mysqlQuery = `
  SELECT * from friend WHERE id_sender = ? AND id_recipient = ?
  UNION
  SELECT * from friend WHERE id_recipient = ? AND id_sender = ?;`;
  return query(mysqlQuery, [id_sender, id_recipient, id_sender, id_recipient]);
};

const postFavorite = (userId, playlistId) => {
  const mysqlQuery = 'INSERT INTO favorite VALUES (?, ?);';
  return query(mysqlQuery, [userId, playlistId]);
};

const deleteFavorite = (userId, playlistId) => {
  const mysqlQuery = 'DELETE FROM favorite WHERE user_id = ? AND playlist_id = ?;';
  return query(mysqlQuery, [userId, playlistId]);
};

const getFavorites = userId => {
  const mysqlQuery = `
  SELECT * FROM playlist 
  WHERE id IN
  (
    SELECT playlist_id FROM favorite WHERE user_id = ?
  )`;
  return query(mysqlQuery, [userId]);
};

const getPlaylist = playlistId => {
  const mysqlQuery = 'SELECT * FROM playlist WHERE id = ?';
  return query(mysqlQuery, [playlistId]);
};

module.exports = {
  // users
  createUser,
  findUser,
  // songs
  addSong,
  findSong,
  // playlists
  addPlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  showUserPlaylist,
  showPlaylistSongs,
  getPlaylist,
  // friends
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend,
  showFriends,
  showSentRequests,
  showReceivedRequests,
  checkPendingRequests,
  // favorite
  postFavorite,
  deleteFavorite,
  getFavorites,
};
