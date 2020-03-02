const csv = require('csv-parser');
const fs = require('fs');
const request = require('request');

let all = request('https://spotifycharts.com/regional/global/daily/latest').pipe(csv(fs.createWriteStream('./data.csv')))
  .on('data', (row) => {
    var allVehicles = JSON.parse(row)
    console.log(allVehicles);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  })

  all();