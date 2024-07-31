
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;
const dbName = 'MongoDbMern';
const uri = 'mongodb://localhost:27017';

// Middleware
app.use(express.json());

const client = new MongoClient(uri, {});
client.connect(uri)
  .then((db) => {
    
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    const usersCollection = db.collection('Users');

    app.get('/addUserData', async (req, res) => {
      try {

        const { username, password } = req.query;
        
        const result = await usersCollection.updateOne(
          { Username: username },
          { $setOnInsert: { Username: username, Password: password } },
          { upsert: true }
        );
        res.send(result.upsertedCount > 0 ? { res: true } : { res: false });

      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch users' });
      }
    });

    app.get('/doesDataMatch', async (req, res) => {
      try {

        const { username, password } = req.query;
        
        const result = await usersCollection.findOne({ Username: username, Password: password });

        res.send(result ? { res: true } : { res: false });

      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch users' });
      }
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
