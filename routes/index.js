var express = require('express');
var router = express.Router();
const request = require('request');

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

/* GET home page. */
router.get('/', function(req, res, next) {
  const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
  // console.log(nowPlayingUrl);
  // req.get takes 2 arg
  //1. the url to get
  //2. the callback to run when req is fulfilled
  request.get(nowPlayingUrl,(error, response, movieData)=>{
    const parsedData = JSON.parse(movieData);
    // console.log(movieData);
    console.log(parsedData);
    res.render('index', { parsedData: parsedData.results,
                imageBaseUrl
               }
                );
  }) 
});

module.exports = router;
