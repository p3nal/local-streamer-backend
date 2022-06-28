const express = require('express');
const path = require('path');
const logger = require('./logger/index')
const fs = require('fs');

const app = express();

app.use(logger);


const musicPath = path.join(__dirname, 'music');

const songs = []

fs.readdir(musicPath, (err, files) => {
  files.forEach(file => {
    songs.push({id: songs.length, name: file});
  })
});

app.get('/', (req, res) => res.send('Welcome back'));

app.get("/list", (req, res) => {
  res.json(songs)
});


app.get('/song/:id', (req, res) => {
  app.set('Content-Length', false)
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Transfer-Encoding', 'chunked');

  const options = {
    root: musicPath,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  res.sendFile(songs.at(req.params.id).name, options);
});



app.listen(8000, () => console.log("aight"));
