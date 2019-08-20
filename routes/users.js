var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//the user is already at /users so don't need to put /users/registerprocess
router.post('/registerProcess',(req, res, next)=>{
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
});

module.exports = router;
