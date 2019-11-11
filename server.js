const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'face-detection'
  }
});

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(db.users);
})

/* SIGN IN - Authenticate user email and password */
app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) });

/* REGISTER - create new user in the database */
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

/* PROFILE - get the users profile if located in database */
app.get('/profile/:id', profile.handleProfileGet(db));

/* IMAGE - keep track of user face detection count */
app.put('/image', (req, res) => { image.handleImage(req, res, db) });

/* IMAGEURL - moved clarifai api call to back-end, authentication key is not exposed */
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});