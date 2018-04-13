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

### Installing

In the same directory as the package.json file, run the following commands below. Currently the development build is running, production version has not been built yet.

```
npm start
```

Webpack should display a development server running which will actively listen for any file changes. If you save a file for example, Webpack will reload and any content you have on the browser will be refreshed.

## Running the tests

Tests haven't been written yet. Only App.jsx has one test.

### Styling Guide

Airbnb Javascript style guide utilized - https://github.com/airbnb/javascript

## Deployment

Pull from evanchen7/react-docker:latest. A docker-compose file is included in the DAMModule repo

```
docker run -d -it --rm -p 80:5000 --name draganddrop evanchen7/react-docker
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
