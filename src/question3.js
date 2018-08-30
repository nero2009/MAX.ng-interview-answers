const express = require('express'); //corrected import statement
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');

/**
 * Assume that these are error free.
 */
const User = require('./models/user');
const logger = require('./utils/logger');

const mongoDB = process.env.MONGO_URI;

const app = express();

mongoose.connect(mongoDB, { useMongoClient: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

app.use(bodyParser.json());

// handler to save user
app.post('/save', function(req, res) { //request before response
  const user = new User(user);

  user.save(function(err) {
    if (err) {
      res.status(500).send(err);
      return logger.log(err);
    }
  });

  res.status(200).send('success');

  return res.json(user);
});

const server = http.createServer(app);

server.listen(80, function() {
  db.on('error', function(error) {
    logger.log(error);
  });
});