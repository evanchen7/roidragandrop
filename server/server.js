require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const proxy = require('html2canvas-proxy');

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(proxy());

//GET Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/healthcheck', (req, res) => {
    res.send(`Listening on port ${PORT}`);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));