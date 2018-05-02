require('dotenv').config();
const express = require('express'),
      path = require('path'),
      cors = require('cors'),
      app = express(),
      PORT = process.env.PORT || 8080;

//Middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use('/public', express.static(__dirname + '/public'));
app.use(cors());

//GET Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  // res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/healthcheck', (req, res) => {
    res.send(`Listening on port ${PORT}`);
});

app.post('/upload', (req, res, next) => {
  console.log(req);
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({file: `public/${req.body.filename}.jpg`});
  });

})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));