const express = require('express');
const cors = require('cors');
const MercadolibreService = require("./MercadolibreService");
require('dotenv').config();
const app = express();
const port = 3000;
ml = new MercadolibreService();

const contentType = 'Content-Type';
const applicationJson = 'application/json';

app.use(cors());

app.get('/users', async (_, res) => {
  res.setHeader(contentType, applicationJson);
  res.end(JSON.stringify(await ml.getUser()));
});

app.get('/users/:id/restrictions', async (req, res) => {
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

app.get('/users/:id/purcharses/:limit?/:offset?', async (req, res) => {
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
/**
 * TODO esto podria pertencer a un catalogo de maestros y ser una asociación uno a uno con los usuarios.
 */
app.get('/levels/:id', async (req, res) => {
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

app.get('/shipments/:id', async (req, res) => {
  res.setHeader(contentType, applicationJson);
  console.log("veamos el servicio y el id : " + req.params.id)
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

app.get('/payments/:id', async (req, res) => {
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
