# DAM Reimplementation

This project is a reimplementation of the Drag and Drop website. Refer to the original repo: https://github.com/roidna/drag-and-drop

I utilized Facebook's React boilerplate starter application: Create-React-App (https://github.com/facebook/create-react-app)

## Getting Started

Within your local development environment, you run you will have to have Node installed and a package management tool. I use NPM or Yarn.

### Prerequisites

Check the package.json files for start scripts and dependencies. For this project, you just need two commands:

```
npm install
```

If NPM does not work, you can try using [YARN](https://yarnpkg.com) and running:

```
yarn install
```

This will install all the dependencies defined in the package.json file



### Serving the front end and local development
In the same directory as the package.json file, run the following commands below. Currently the development build is running, production version is detailed elsewhere.

```
npm run dev
```
```
yarn run dev
```

Once the command fires off, the server information will be broadcasted in your terminal. Webpack should display a development server running which will serve the React app. Hotloading is enabled, if you save a file for example, Webpack will reload and any content you have on the browser will refresh.

<p align="center"><img src="https://i.imgur.com/nAWr2MY.png"/></p>

Major errors such as server crashing will display. Linting errors will occasionaly show up, but that can be ignored.

Environment variables can be injected, use the .env.bak file and add whatever you need. After rename the file to ".bak"

## Development/Production

### Access
In order to access the Dev/Prod environment, login into the ROI-DNA AWS account and ssh into the **DAM-Module-PROD** instance. The instance is a t2.micro running Ubuntu 16.04.

### Docker

The production environment contains four docker containers:

* evanchen7/react-docker - React Frontend App
* evanchen7/roidnadammodule:latest - Wordpress
* mysql:latest - MySQL
* phpmyadmin/phpmyadmin - PHPMyAdmin

<p align="center"><img src="https://i.imgur.com/AlzCzEv.png"/></p>

### Environment

process.env.USERNAME
process.env.PASSWORD

.env file needs to be changed with admin credentials, for ease of usage, I enabled [Basic Authentication Plugin](https://github.com/WP-API/Basic-Auth)  for authentication.

yarn build
Move build folder to server/



## Running the tests

Tests haven't been written yet. Only App.jsx has one test.

### Styling Guide

Airbnb Javascript style guide utilized - https://github.com/airbnb/javascript

## Deployment

Pull from evanchen7/react-docker:latest. A docker-compose file is included in the DAMModule repo

```
docker run -d -it --rm -p 80:3000 --name draganddrop evanchen7/react-docker
```

## Built With

* [React](https://reactjs.org/) - The web framework used
* [NodeJS](https://nodejs.org/en/) - JavaScript networking and package management
* [Docker](https://www.docker.com/) - Cloud container technology used for building and shipping applications
* [Semantic UI](https://react.semantic-ui.com) - UI Framework built with React components
* [WP-API](https://github.com/WP-API/node-wpapi) - A NodeJS library used to interact with Wordpress REST API

## Authors

* **Evan Chen** - *Initial work* - [evanchen7](https://github.com/evanchen7)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Original SASS/SCSS by ROI-DNA [ROI-DNA](https://www.roidna.com/)
