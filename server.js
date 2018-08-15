const express = require('express');
const bodyParser = require('body-parser'); //for read json
const bcrypt = require('bcrypt-nodejs'); // hash for password
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'natthanan',
    password : '',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data=>{
	console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
	//res.send('this is working');
	res.send(database.users);
})

app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt)});

// transaction if one fail, the others will fail.

app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})
//can short to this
//app.post('/register',register.handleRegister(db,bcrypt))
//but in register must fix into something looks like this const handleRegister = (db,bcrypt)=> (req,res)=>{
app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)})

/*
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/

app.listen(3000,()=>{
	console.log('app is running on port 3000')
});


/*
/ --> res = this is working
/signin --> POST =  success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> (update) user (count)
*/