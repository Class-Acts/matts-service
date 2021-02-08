const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const photoSchema = new mongoose.Schema({
  _id: Number,
  c_i: Number,
  url_thumbnail: String,
  url_regular: String,
  url_full: String,
  item_id: Number,
  style_id: Number
});

const stylesSchema = new mongoose.Schema({
  _id: Number,
  color: String,
  item_id: Number,
  sizes: String,
  price: String
});

const itemSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  brand: String,
  avgRatings: Number,
  numRatings: Number,
});

const Item = mongoose.model('Item', itemSchema);
const Photo = mongoose.model('Photo', photoSchema);
const Style = mongoose.model('Style', stylesSchema);
module.exports = {
  Item,
  Photo,
  Style
};