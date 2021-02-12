const db  = require('./index.js');
const faker = require('faker');
const Promise = require('bluebird');
const photoBank = require('./data/photos.json');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = Promise.promisifyAll(require('fs'));
const exec = Promise.promisify(require("child_process").exec);


const itemWriter = createCsvWriter({
  path: 'items.csv',
  header: [
    {id: '_id', title: '_id'},
    {id: 'name', title: 'name'},
    {id: 'brand', title: 'brand'},
    {id: 'avgRatings', title: 'avgRatings'},
    {id: 'numRatings', title: 'numRatings'},
  ]
})

const photoWriter = createCsvWriter({
  path: 'photos.csv',
  header: [
    {id: '_id', title: '_id'},
    {id: 'c_i', title: 'c_i'},
    {id: 'url_thumbnail', title: 'url_thumbnail'},
    {id: 'url_regular', title: 'url_regular'},
    {id: 'url_full', title: 'url_full'},
    {id: 'item_id', title: 'item_id'},
    {id: 'style_id', title: 'style_id'}
  ]
})

const styleWriter = createCsvWriter({
  path: 'styles.csv',
  header: [
    {id: '_id', title: '_id'},
    {id: 'color', title: 'color'},
    {id: 'price', title: 'price'},
    {id: 'item_id', title: 'item_id'},
    {id: 'sizes', title: 'sizes'}
  ]
})

let id = 1;
let style_id = 1;
let photos_id = 1;



let itemsArr = [];
let stylesArr = [];
let photosArr = [];

const rI = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generatePhotos = (styleId) => {
  let numberOfPhotos = rI(1, 3);
  for (var i = 0; i < numberOfPhotos; i++) {
    let randomPhoto = photoBank[rI(0, 37)];
    let photo = {
      _id: photos_id,
      c_i: i,
      url_thumbnail: randomPhoto.urls.thumb,
      url_regular: randomPhoto.urls.regular,
      url_full: randomPhoto.urls.full,
      item_id: id,
      style_id: styleId
    }
    photosArr.push(photo)
    photos_id++
  }
};

const generateStyles = () => {
  let numberOfStyles = rI(1, 4);
  for (var i = 1; i <= numberOfStyles; i++) {
    let current_id = style_id
    let newStyle = {
      _id: style_id,
      color: faker.commerce.color(),
      price: rI(2000, 20000),
      item_id: id,
      sizes: "5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15"
    };
    stylesArr.push(newStyle);
    style_id++
    generatePhotos(current_id);
  }
};


const buildCollection = () => {
  for (var i = 0; i < 10000; i++ ) {
    let newItem = {
      _id: id,
      name: faker.commerce.productName(),
      brand: faker.company.companyName(),
      avgRatings: rI(10, 50),
      numRatings: rI(0, 350),
    };
    generateStyles();
    id++;
    itemsArr.push(newItem);
  }
};


const writeData = async () => {
  console.log('inserting')
  await photoWriter.writeRecords(photosArr)
    .then(() => {
      photosArr = [];
      console.log('photos deleted')
      return itemWriter.writeRecords(itemsArr)
    })
    .then(() => {
      itemsArr = [];
      return styleWriter.writeRecords(stylesArr)
    })
    .then(() => {
      stylesArr = [];
      console.log('done')
    })
    .catch(e => e.message)

}


const seedDb = async () => {
  let photosCmd = "mongoimport --db sdc --collection photos --type csv --file photos.csv --headerline";
  let itemsCmd = "mongoimport --db sdc --collection items --type csv --file items.csv --headerline";
  let stylesCmd = "mongoimport --db sdc --collection styles --type csv --file styles.csv --headerline";
  for (var i = 0; i < 1000; i++) {
    await buildCollection();
    await writeData();
    exec(itemsCmd, {maxBuffer: 1024 * 1024 * 10})
    .then(() => exec(stylesCmd, {maxBuffer: 1024 * 1024 * 10})
    .then(() => exec(photosCmd, {maxBuffer: 1024 * 1024 * 10})
    .then(() => fs.unlinkAsync('styles.csv'))
    .then(() => fs.unlinkAsync('items.csv'))
    .then(() => fs.unlinkAsync('photos.csv'))
  }
};

seedDb();




