# REI Item Product Page

> Item Checkout and Preview Module

## Related Projects

  - https://github.com/lokisscepter/bschaaf1017-service
  - https://github.com/lokisscepter/sq-service
  - https://github.com/lokisscepter/pvl-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

This project uses MySQL

> Edit `db/db.config.js` with your MySQL credentials

> `npm run seed-db` to seed database

Webpack is used to bundle the application

> `npm run webpack-prod` to build production version of service

The service is run using an express server, listening on port 8080

> `npm run start-prod` to start the service

This service renders to the DOM Node `item_preview_checkout` and is bundled to `bundle.js`

> Include a `div` element on the proxy server `index.html` with the id `item_preview_checkout` along with a script element with src `http://localhost:8080/dist/bundle.js` to render the service

## Requirements

Dependencies are specified in `package.json`

### Installing Dependencies

From within the root directory:

```sh
npm install
```