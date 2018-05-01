# DAM React App

This project is a reimplementation of the Drag and Drop website. Refer to the original repo: https://github.com/roidna/drag-and-drop

I utilized Facebook's React boilerplate starter application: Create-React-App (https://github.com/facebook/create-react-app)

## Getting Started
***
Within your local development environment, you run you will have to have Node installed and a package management tool. I use NPM or Yarn. If this is your first time installing either NodeJS or Yarn, I recommend using [Node Version Manager](https://github.com/creationix/nvm)

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

Environment variables can be injected, use the .env.bak file and add whatever you need. After rename the file to ".bak".

I added the production and development URL, as well as the required PORT number. USERNAME and PASSWORD needs to have basic credentials to access the Wordpress backend (same one used to login)

### Basic Usage
***
<p align="center">
    <img src="https://i.imgur.com/8k4KEVX.png" width="300" height="400"/></p>
<p align="center">
    <em>Main Page (Responsive Mode)</em>
</p>

* Toolbars contain dropdown menus that allow the user to switch between the loaded images
* Additional Toolbars can be added when clicking on the green plus button. Currently only Module toolbars can be added.
* Under the Tools button, Toolbars can be added to the top of the stack or on the end. Clicking on Reset will prompt a modal to remove all Toolbars.
* Hovering over a selected image will reveal a 'X' button which allows users to deselect/cancel the image.

***

<p align="center">
    <img src="https://i.imgur.com/fgBSAW3.png" width="200" height="319"/>
</p>
<p align="center">
    <em>Toolbar</em>
</p>

* Clicking on the downward arrow will open a dropdown menu
* A search bar currently filters for image names
* Selecting one of the options will instantly render the image onto the main area.
* The name of the Toolbar corresponds with the different sections in the main area. The position of the Toolbars also match the different sections.

***

<p align="center">
    <img src="https://i.imgur.com/svFsFV8.png" width="380" height="316"/>
</p>
<p align="center">
    <em>Tools Menu</em>
</p>

* Clicking Tools Menu will open a dropdown menu
* The Headers, Modules, and Footer will open an option to add a new Toolbar to the top or bottom of the main area
* The Reset button will erase the Toolbars and erase the main area. A popup modal will open and prompt the user for reset. Simply add more modules or refresh the page.
* The Save button will open a popup modal that will allow the user to save

***

<p align="center">
    <img src="https://i.imgur.com/9m6eHwQ.png" width="512" height="324"/>
</p>
<p align="center">
    <em>Screenshot Modal</em>
</p>

* To save the user's information, all fields must be filled: **Author Name**, **Author Email**, and **Project Title**
* Saving will open a loading screen and a status update
* If the user wants to save a stitched photo of all the modules, simply press Preview. All modules must have content or else the application will throw an error.
* Right click on the preview image and save the png file to your local harddrive.


***

<p align="center">
    <img src="https://i.imgur.com/KwarQcU.png" width="512" height="324"/>
</p>
<p align="center">
    <em>Save Success</em>
</p>

* If the save was successful, another modal will appear.
* Relevant information regarding access, title, name, and link will display
* Post ID represents the Finished Page id found in the Wordpress backend

## Development/Production
***

### Access
In order to access the Dev/Prod environment, login into the ROI-DNA AWS account and ssh into the **DAM-Module-PROD** instance. The instance is a t2.micro running Ubuntu 16.04.


### Docker

The Dev/Prod environment contains four docker containers:

* evanchen7/react-docker - **React Frontend App**
* evanchen7/roidnadammodule:latest - **Wordpress**
* mysql:latest - **MySQL**
* phpmyadmin/phpmyadmin - **PHPMyAdmin**

<p align="center"><img src="https://i.imgur.com/AlzCzEv.png"/></p>

**Note: evanchen7/react-docker is the production front end application, the other containers are for development purposes. The production wordpress instance is here: https://damcms.roidna.com**

#### Dockerfile and Docker-Compose

I follow this person's pattern on creating the development instance: https://github.com/nezhar/wordpress-docker-compose

The [docker-compose.yml](docker-compose.yml) file contains the settings I used, some notes:
* For the wp-data folder, I used a db dump sql file from https://damcms.roidna.com** to seed the development's MySQL instance
* For the wp-app folder, I already created a docker image of the damcms instance and should already populate with preinstalled themes and plugins

#### Gotchas
* WP Migrate DB will allow a smoother transition, the plugin will find and replace URLs and File Paths
* The following commands will help with the file permissions, there are easier ways to automate, but I was fed up with my shell scrips not running inside the docker containers

```
sudo chmod -R 777 wp-content #Fixes permission outside of docker container
```
```
docker exec -t -i my_instance_name /bin/bash; #Access docker container
usermod -u 1000 www-data #Give RW access to user 1000
```

## Deployment
***
In the project root, there is an **.env.bak** file that needs to be changed to **.env** and the credentials must come from damcms.roidna.com user database.
```
REACT_APP_USERNAME=FILLMEIN
REACT_APP_PASSWORD=FILLINME
```
In order for the front end to interact with the wordpress backend, I enabled [Basic Authentication Plugin](https://github.com/WP-API/Basic-Auth) for authentication.

In order to prepare for production deployment, we have to create a lightweight version of the development build, to do so we run the following command:
```
yarn build #or npm run build
```
<p align='center'><img src='https://i.imgur.com/0VRyHaV.png'/></p>
<p align='center'><em>Successful build</em></p>

The result will be a new folder named Build containing all the clientside code. Now we have to serve that folder. Place the build folder in server/

```
mv build/ server/
```

Once that is complete we are going to dockerize the project. See the dockerfile that is in this repo for more information.

```
docker build -t evanchen7/react-docker:latest . ;
docker images; #check to see if the image was correctly built
docker push evanchen7/react-docker:latest #push the image to docker hub
```

Once that is complete we can head into the Dev/Prod environment and pull down the new image.
```
docker pull evanchen7/react-docker:latest; #pulls down from docker hub
docker run -d -it --rm -p 80:3000 --name draganddrop evanchen7/react-docker
```
The last command runs the image and a container called **draganddrop** will be created. The container will have port 3000 exposed and the command binds it to 80. Assuming there is no errors, we can access the application through the assigned ip.

## Continuous Integration/Continuous Deployment
***

https://cloud.docker.com/swarm/evanchen7/repository/docker/evanchen7/react-docker/general

Docker is listening for a change in MASTER branch of roidragandrop. When there's a change Docker will build a new image.

Watchtower will be implemented in the future for continuous deployment: https://github.com/v2tec/watchtower

## Running the tests
***
Tests are written for JEST and Enzyme

## Styling Guide
***
Airbnb Javascript style guide utilized - https://github.com/airbnb/javascript

## Built With
***
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [NodeJS](https://nodejs.org/en/) - JavaScript networking and package management
* [Docker](https://www.docker.com/) - Cloud container technology used for building and shipping applications
* [PM2](http://pm2.keymetrics.io/) - A Complete feature set for production environment, built with a worldwide community of developers and enterprises
* [Semantic UI](https://react.semantic-ui.com) - UI Framework built with React components
* [WP-API](https://github.com/WP-API/node-wpapi) - A NodeJS library used to interact with Wordpress REST API

## Bugs
***
* Clicking on Toolbar and then clicking on the search input will close the dropdown
* After search input is complete, the results will remain the same. User will have to create a new Toolbar

## To Do
***
* Complete Pages link
* Save stitched picture to Express backend and then save to Wordpress CMS
* Enable Watchtower to listen for any new docker images
* Unit testing for Wordpress instance

## Authors
***
* **Evan Chen** - *Initial work* - [evanchen7](https://github.com/evanchen7)

## License
***
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
***
* Original SASS/SCSS by ROI-DNA [ROI-DNA](https://www.roidna.com/)
