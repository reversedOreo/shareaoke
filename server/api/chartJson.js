var fs = require('fs');
const axios = require('axios')
 axios.get("/chart/Music")
  .then((artist) => {
    let r = artist.data
    let arr = [],
      keys = Object.keys(r);
    for (var i = 0; i <= keys.length - 1; i++) {
      var key = keys[i];
      arr[key] = r[key];
      //var array = arr[key]
      //console.log(arr)
    }
  }).then((arr) => {fs.writeFile("input.json", JSON.stringify(arr))}).catch((err) => {
    console.log(err, "fucked up")
  
    //console.log(newArr, "help");

  
  })

  
