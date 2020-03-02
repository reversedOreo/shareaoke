const express = require('express');
const parser = require('body-parser');
const path = require('path');
const { apiRouter } = require('./api/index');
const { spotifyRouter } = require('./auth-server/authorization_code/app');
const csv = require('csv-parser');
const fs = require('fs');
const app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// let all = fs.createReadStream('../regional-global-daily-latest.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     console.log(row);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//   });


// app.set('view engine', 'html');

const PORT = 8080;
const CLIENT_PATH = path.join(__dirname, '../client/dist');

app.use(express.static(CLIENT_PATH));
app.use(parser.json());
app.use('/api', apiRouter);
app.use('/spotify', spotifyRouter);

app.listen(PORT, () => {
  console.log(`Listening on :${PORT} 🚀`);
});

module.exports.app = app;
