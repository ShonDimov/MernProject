
const express = require('express');
const { MongoClient } = require('mongodb');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const dbName = 'MongoDbMern';
const uri = 'mongodb://localhost:27017';

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'mern-session',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use('/images', express.static(path.join(__dirname, 'images')));

const client = new MongoClient(uri, {});
client.connect(uri)
  .then((db) => {
    
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    const usersCollection = db.collection('Users');
    const productsCollection = db.collection('Products');

    app.get('/signup', async (req, res) => { // User signs up
      try {

        const { username, password } = req.query;
        
        const result = await usersCollection.updateOne(
          { Username: username },
          { $setOnInsert: { Username: username, Password: password } },
          { upsert: true }
        );

        const response = { status: false }
        if (result.upsertedCount > 0) {

          const token = generateSessionToken(username);
          res.cookie('session', token, { httpOnly: true, secure: true });
          response.status = true

        }

        res.send(response);

      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch users' });
      }
    });

    app.get('/login', async (req, res) => { // User logs in
      try {

        const { username, password } = req.query;
        
        const result = await usersCollection.findOne({ Username: username, Password: password });

        const response = { status: false }
        if (result) {

          res.cookie('session', username, { httpOnly: true, secure: true });
          response.status = true

        }

        res.send(response);

      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch users' });
      }
    });

    app.get('/enterStore', (req, res) => { // User trys to login with session

      const token = req.cookies['session']; // Read the session token from the cookie
      const response = { status: false }

      if (token) {
        response.status = true
      }

      res.send(response);

    });

    app.get('/logout', (req, res) => { // User logs out

      res.cookie('session', '', { expires: new Date(0), httpOnly: true, secure: true });
      res.send({ status: true });

    });

    app.get('/getCards', async (req, res) => { // Gets 10 cards from db

      const data = await productsCollection.find().limit(10).toArray()
      res.json(data);
      
    });
  
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);

})
