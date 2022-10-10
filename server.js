const express = require('express');
const cors = require('cors');
const MercadolibreService = require("./MercadolibreService");
require('dotenv').config();
const app = express();
const port = 3001;
ml = new MercadolibreService();

const contentType = 'Content-Type';
const applicationJson = 'application/json';

app.use(cors());

app.get('/get/user', async (_, res) => {
  res.setHeader(contentType, applicationJson);
  res.end(JSON.stringify(await ml.getUser()));
});

app.get('/user/:id/restriction', async (req, res) => {
  res.setHeader(contentType, applicationJson);
  try {
    res.end(JSON.stringify(await ml.getUserRestrictions(req.params.id)));
  }catch (err){
    const {status,message} = err;
    res.json({
      status,
      message
    })
  }
});

app.get('/user/:id/purcharse/:limit?/:offset?', async (req, res) => {
  res.setHeader(contentType, applicationJson);
  try {
    res.end(JSON.stringify(await ml.getUserPurchases(req.params.id,req.params.limit,req.params.offset)));
  }catch (err){
    const {status,message} = err;
    res.json({
      status,
      message
    })
  }
});

app.get('/profile/:id/level', async (req, res) => {
  res.setHeader(contentType, applicationJson);
  try {
    res.end(JSON.stringify(await ml.getLevel(req.params.id)));
  }catch (err){
    const {status,message} = err;
    res.json({
      status,
      message
    })
  }
});

app.get('/shipment/:id', async (req, res) => {
  res.setHeader(contentType, applicationJson);
  try {
    res.end(JSON.stringify(await ml.getShipment(req.params.id)));
  }catch (err){
    const {status,message} = err;
    res.json({
      status,
      message
    })
  }
});

app.get('/payment/:id', async (req, res) => {
  res.setHeader(contentType, applicationJson);
  try {
    res.end(JSON.stringify(await ml.getPayment(req.params.id)));
  }catch (err){
    const {status,message} = err;
    res.json({
      status,
      message
    })
  }
});


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
