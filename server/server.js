require('dotenv').config();
const express = require('express'),
      path = require('path'),
      cors = require('cors'),
      app = express(),
      PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

//GET Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/healthcheck', (req, res) => {
    res.send(`Listening on port ${PORT}`);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));