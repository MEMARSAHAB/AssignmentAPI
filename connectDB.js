const mongoose = require('mongoose');

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected');
  } catch (error) {
    console.log(`DB connection faild  ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
