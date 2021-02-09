require('newrelic');
const express = require('express');
const cors = require('cors')
const path = require('path')
const db = require('../mongoDb/Item.js')

const app = express();

app.use(cors())

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/api/items/:item_id/info', async (req, res) => {
  const currentId = req.params.item_id;
  let data = await db.Item.find({_id: currentId });
  res.status(200).send(data);
})

app.get('/api/items/:item_id/styles', async (req, res) => {
  const currentId = req.params.item_id;
  let data = await db.Style.find({item_id: currentId});
  res.status(200).send(data);
})

app.get('/api/items/:item_id/sizes', async (req, res) => {
  const currentId = req.params.item_id;
  let data = await db.Style.find({item_id: currentId});
  let sizesArr = [];
  data.forEach((s) => {
    let sizeObj = {
      size: s.sizes.split(', '),
      item_id: s.item_id ,
      style_id: s._id
    }
    sizesArr.push(sizeObj)
  })
  res.status(200).send(sizesArr);
})

app.get('/api/items/:item_id/photos', async (req, res) => {
  const currentId = req.params.item_id;
  let data = await db.Photo.find({item_id: currentId});
  res.status(200).send(data);
})


const PORT = process.env.PORT || 443;

app.listen(PORT, () => console.log(`express is listening on port ${PORT}`));



