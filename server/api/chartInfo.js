const { Router } = require('express');
const chartRouter = Router()
const axios = require('axios');
const { mostSongsInPlaylist } = require('../db/index');
const { selectSongsFromDatabase } = require('../db/index')

 chartRouter.get('/Music', (req, res) => {
   const urlGit = "https://billboard-api2.p.rapidapi.com/hot-100";
   const options = {
     headers: {
       "x-rapidapi-host": "billboard-api2.p.rapidapi.com",
       "x-rapidapi-key": "3103d5f086msh3e40f79c67ddb3ep153acajsn06e10253a534"
     },
     params: {
       "date": "2020-02-29",
       "range": "1-10"
     }
   };

   axios.get(urlGit, options, req, res)
     .catch(err => { console.log(err) })
     .then((artist) => {

       const repos = artist.data.content; //this is an array
       res.send(repos)
     });
 })

chartRouter.get('/sqlMusic', (req, res) => {
  mostSongsInPlaylist().then((data) => {
    let songDataCount = data.map((eachSongCount) => {
        let songCount = eachSongCount
      return songCount;
      })
      let songDataId = data.map((eachSongId) => {
        let songId = eachSongId.id_song
        return songId;
      })
      
    return selectSongsFromDatabase(songDataId).then((songs) => {
      return songs.map((singleSong) => {
        songDataCount.map((singleSongData) =>{
          if (singleSong.id === singleSongData.id_song){
            return singleSong;
          }
          return singleSong.songCountNumber = singleSongData.numberSongs
        })
        return singleSong;
        })
      })
    }).then((topSongs) => {
      res.send(topSongs);
  })
})


module.exports = {
  chartRouter,
};