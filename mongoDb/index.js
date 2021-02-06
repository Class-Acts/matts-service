const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/sdc?keepAlive=true&poolSize=30&autoReconnect=true&socketTimeoutMS=360000&connectTimeoutMS=360000';

const db = mongoose.connect(mongoUri, { useNewUrlParser: true})
  .catch(error => console.log(error));



module.exports = db;