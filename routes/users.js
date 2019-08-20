var express = require('express');
var router = express.Router();
const db = require('./db');
const bcrypt = require('bcrypt');
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

  const checkUserExistsQuery = `
  SELECT * FROM users WHERE username = $1 or email = $2
  `
  db.any(checkUserExistsQuery,[username,email]).then((results)=>{
    if(results.length>0){
      // this user already exists
      res.redirect('/login?msg=userexists')
    }else{
      //new user. insert
      insertUser();
    };
  });
function insertUser(){
  const insertUserQuery=`INSERT INTO users (username,email,password)
  VALUES 
  ($1,$2,$3)
  returning id`
  const hash = bcrypt.hashSync(password,10);
  db.one(insertUserQuery,[username, email, hash]).then((resp)=>{
    res.json({
      msg: resp
    })
  })
}
});

router.post('/loginProcess', (req, res)=>{
  // res.json(req.body);
  const checkUserQuery = `
  SELECT * FROM users WHERE username =$1 
  `
  const checkUser = db.one(checkUserQuery,[req.body.username])
    checkUser.then((results)=>{
    res.json(results);
  })
  checkUser.catch((error)=>{
    res.json({
      msg: "userDoesNotExist"
    })
  })
});


module.exports = router;
