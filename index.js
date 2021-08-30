const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); //used just for development prpouse

require('dotenv').config(); //to access .env. variables

const connectDB = require('./connectDB.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(morgan('dev')); //to cheack that we hit right end point, used to avoid console log in every route

app.use(require('./routes')); //handling routes in deffrrnt file to keep it more orgenize

connectDB(); //connecting to mongoDB database

module.exports = app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
