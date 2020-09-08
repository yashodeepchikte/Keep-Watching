const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    console.log("Attempting to connect to the database")
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('MongoDB is Connected... ');
  } catch (err) {
    console.log("Error in connecting to the database")
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;