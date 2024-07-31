
const express = require('express');
const { MongoClient } = require('mongodb');
const cookieParser = require('cookie-parser');
const session = require('express-session')

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

const client = new MongoClient(uri, {});
client.connect(uri)
  .then((db) => {
    
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    const usersCollection = db.collection('Users');

    app.get('/signup', async (req, res) => {
      try {

        const { username, password } = req.query;
        
        const result = await usersCollection.updateOne(
          { Username: username },
          { $setOnInsert: { Username: username, Password: password } },
          { upsert: true }
        );

        const respond = { status: false }
        if (result.upsertedCount > 0) {

          const token = generateSessionToken(username);
          res.cookie('session', token, { httpOnly: true, secure: true });
          respond.status = true

        }

        res.send(respond);

      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch users' });
      }
    });

    app.get('/login', async (req, res) => {
      try {

        const { username, password } = req.query;
        
        const result = await usersCollection.findOne({ Username: username, Password: password });

        const respond = { status: false }
        if (result) {

          //const token = generateSessionToken(username);
          res.cookie('session', username, { httpOnly: true, secure: true });
          respond.status = true

        }

        res.send(respond);

      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch users' });
      }
    });

    app.get('/enterStore', (req, res) => { // User try to login with session

      const token = req.cookies['session']; // Read the session token from the cookie
      const respond = { status: false }

      if (token) {
        respond.status = true
      }

      res.send(respond);

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
