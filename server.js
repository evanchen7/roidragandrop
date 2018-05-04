require('dotenv').config();
const express = require('express'),
      path = require('path'),
      cors = require('cors'),
      fs = require('fs'),
      promisify = require('util').promisify,
      WPAPI = require('wpapi'),
      apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL,
      DEVELOPMENTURL = `${apiUrl}/wp-json`,
      wp = new WPAPI({ endpoint: DEVELOPMENTURL, username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD, auth: true }),
      app = express(),
      PORT = process.env.DEVPORT || 8080;

//Middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(cors());

//GET Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/healthcheck', (req, res) => {
    res.send(`Listening on port ${PORT}`);
});

app.post('/upload',  (req, res, next) => {
  console.log('inside')
  wp.stitchedPhoto = wp.registerRoute('wp/v2', '/stitched_photo');
  const stat = promisify(fs.stat);
  const mkdir = promisify(fs.mkdir);
  const writeFile = promisify(fs.writeFile);
  const unlink = promisify(fs.unlink);

  const { projectTitle, pngData, authorName, authorEmail } = req.body;
  const data = pngData.replace(/^data:image\/\w+;base64,/, "");
  const buf = new Buffer(data, 'base64');

  try {

    stat('temp').then((check, test) => {
      if (check.isDirectory()) {
        writeFile(`${__dirname}/temp/${projectTitle}.png`, buf).then((data) => {

          wp.media()
            .file(`${__dirname}/temp/${projectTitle}.png`)
            .create({ title: projectTitle})
            .then((response) => {
              const newImageId = response.id;
              return wp.stitchedPhoto()
                      .create({
                          title: projectTitle,
                          status: 'publish',
                          tags: ['Stitched Photo'],
                          fields: {
                            'author_name': authorName,
                            'author_email': authorEmail,
                            'project_title': projectTitle,
                            'stitched_photo': newImageId
                          }
                       })
            }).then((data) => {
               unlink(`${__dirname}/temp/${projectTitle}.png`);
               return data;
            }).then((data) => {
              const responseData = {
                link: data.link,
                type: data.type,
                fileDeleted: true
              }
              res.json(responseData);
            })
        })
      }
    })
    .catch((err) => {

      mkdir(`${__dirname}/temp/`).then(() => writeFile(`${__dirname}/temp/${projectTitle}.png`, buf))
          .then((data) => {

          wp.media()
            .file(`${__dirname}/temp/${projectTitle}.png`)
            .create({ title: projectTitle})
            .then((response) => {
              const newImageId = response.id;
              return wp.stitchedPhoto()
                      .create({
                          title: projectTitle,
                          status: 'publish',
                          tags: ['Stitched Photo'],
                          fields: {
                            'author_name': authorName,
                            'author_email': authorEmail,
                            'project_title': projectTitle,
                            'stitched_photo': newImageId
                          }
                       })
            }).then((data) => {
               unlink(`${__dirname}/temp/${projectTitle}.png`)
               return data
            }).then((data) => {
              const responseData = {
                link: data.link,
                type: data.type,
                fileDeleted: true
              }
              res.json(responseData);
            })
        })
    });



  } catch (e) {
    res.sendStatus(500);
    return next(e);
  }
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));