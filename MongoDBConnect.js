mongoose = require('mongoose');

const MONG_URI = 'mongodb://localhost:27017/BooksData';

mongoose.connect(MONG_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Error occurred: ' + err);
});

db.once('connected', () => {
  console.log("MongoDB connected successfully!");
});

module.exports = db;
