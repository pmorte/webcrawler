import puppeteer from 'puppeteer';
import { URL } from 'url';

const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;
import express from 'express';
//const express = require('express');
const app = express()
const port = 3001
app.use(express.static(path.join(__dirname, 'statics')));
import  path from 'path';

app.get('/', (request, response) => {
  //res.send('Hello World!')
  response.sendFile(__dirname + '/index.html');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})