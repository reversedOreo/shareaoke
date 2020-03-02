const csv = require('csv-parser');
const fs = require('fs');

let all = function() {
  fs.createReadStream('../regional-global-daily-latest.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  })
};
all();
