const csv = require('csv-parser');
const fs = require('fs');
const request = require('request');
const { Router } = require('express');
const chartRouter = Router()

 chartRouter.get('/MusicChart', (req, res) => {
  chart().then((data) => {
    res.send(data)
  }).then((err) => {
    console.log(err);
  })
})
  
let chart = function(){
  request('https://spotifycharts.com/regional/global/daily/latest').pipe(csv(fs.createWriteStream('./data.csv')))
    .on('data', (row) => {
      var allVehicles = JSON.parse(row)
      console.log(allVehicles);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    })
}