import React, { Component } from 'react';
import axios from 'axios';
import WPAPI from 'wpapi';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import html2canvas from 'html2canvas';
import Headers from './Header';
import FinishedPage from './FinishedPage';
import Main from './Main';
import './css/main.css';

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
const HEADER = `${apiUrl}/wp-json/wp/v2/header`;
const MODULE = `${apiUrl}/wp-json/wp/v2/module`;
const FOOTER = `${apiUrl}/wp-json/wp/v2/footer`;
const DEVELOPMENTURL =`${apiUrl}/wp-json`;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      header: [],
      module: [],
      footer: [],
      headerSelection: null,
      moduleSelection: null,
      footerSelection: null,
      initialModules: ["Header", "Module", "Footer"],
      previewScreenshot: {},
      authorName: '',
      authorEmail: '',
      projectTitle: '',
      dataSaveStatus: null,
      sidebarVisibility: false,
      error: null,
    };
  }

  componentDidMount() {
    this.grabDataFromWordPress();
  }

  previewScreenshot = () => {
    html2canvas(document.querySelector("#screenshotarea"), { letterRendering: 1, useCORS : true })
      .then(canvas => {
        canvas.id = "canvascapture";
        let dataURL = canvas.toDataURL('image/png', 1.0);
        document.querySelector("#newScreenshot").src = dataURL;
        return dataURL;
    }).catch((err) => {
      let error = { ...this.state.error, [err]: err}
      this.setState({error});
    });
  }

  handleFormInput = (e) => {
    let value = e.target.value;
    switch (e.target.placeholder) {
      case "Author Name":
        return (
          this.setState((prevState, props) => ({
            authorName: value
        }))
        );
      case "Author Email":
        return (
          this.setState((prevState, props) => ({
            authorEmail: value
        }))
        );
      case "Project Title":
        return (
          this.setState((prevState, props) => ({
            projectTitle: value
        }))
        );
      default:
        return null;
    }
  }

  saveScreenshot = (e) => {
    e.preventDefault();

    const wp = new WPAPI({
      endpoint: DEVELOPMENTURL,
      username: 'evan@roidna.com',
      password: 'Gvpix5597!Gvpix5597!',
      auth: true
    });
    wp.finishedPage = wp.registerRoute('wp/v2', '/finished_page');
    const postData = {
      author_name: this.state.authorName,
      author_email: this.state.authorEmail,
      project_title: this.state.projectTitle,
      headerid: this.state.headerSelection.id,
      moduleid: this.state.moduleSelection.id,
      footerid: this.state.footerSelection.id
    }

    //REFACTOR
    const generateImage = () => {
      // return this.state.map(item => `<img src="${item.url}" alt=""/>)`

      return (
        `<img src="${this.state.headerSelection.url}" alt=""/>
        <img src="${this.state.moduleSelection.url}" alt=""/>
        <img src="${this.state.footerSelection.url}" alt=""/>`
      )
    }

    if (!postData) {
      const error = "No Post Data!"
      this.setState(...this.state.error, {[error]: error});
    }

    wp.finishedPage()
      .create({
        title: postData.project_title,
        content: generateImage(),
        status: 'publish',
        tags: ['Finished Page'],
        fields: postData
      }).then((res) => {
        this.setState({
          dataSaveStatus: res.id
        })
      }).catch((err) => {
        let error = { ...this.state.error, [err]: err}
        this.setState({error});
      });
  }

  grabDataFromWordPress = () => {
    axios.all([ axios.get(HEADER), axios.get(MODULE), axios.get(FOOTER)])
      .then(axios.spread((headerRes, moduleRes, footerRes) => {
        this.setState({
          header: headerRes.data,
          module: moduleRes.data,
          footer: footerRes.data
        });
      }))
      .catch(error => this.setState({ error }));
  }

  handleModuleSelection = (e, selection) => {
    switch(selection.placeholder) {
      case 'Header':
        return ( this.setState((prevState, props) => ({
          "headerSelection": selection.value
        }))
      );
      case 'Module':
        return ( this.setState((prevState, props) => ({
        "moduleSelection": selection.value
         }))
      );
      case 'Footer':
        return (
          this.setState((prevState, props) => ({
            "footerSelection": selection.value
          }))
      );
      default:
        return null;
    }
  }

  deleteModuleSelection = () => {

  }

  handleOptionsSidebar = () => {
    this.setState({ sidebarVisibility: !this.state.sidebarVisibility });
  }

  handleAddModules = (moduleType) => {
    let newInitialModules = this.state.initialModules;
    newInitialModules.push(moduleType);

    this.setState((prevState, props) => ({
      "initialModules": newInitialModules
    }));
  }

  render() {
    const { authorName, authorEmail, projectTitle, previewScreenshot } = this.state;
    const updatedFormValues = {
      authorName, authorEmail, projectTitle, previewScreenshot
    };
    return (
      <Router>
        <div className="wrapper">
          <Headers
            handleAddModules={this.handleAddModules}
            handleOptionsSidebar={this.handleOptionsSidebar}
            dataSaveStatus={this.state.dataSaveStatus}
            updatedFormValues={updatedFormValues}
            handleName={this.handleFormInput}
            handleEmail={this.handleFormInput}
            handleProjectTitle={this.handleFormInput}
            previewScreenshot={this.previewScreenshot}
            saveScreenshot={this.saveScreenshot} />
            <Switch>
              <Route exact path="/"
                render={ () =>
                <Main
                  initialModules={this.state.initialModules}
                  header={this.state.header}
                  module={this.state.module}
                  footer={this.state.footer}
                  handleHeaderSelection={this.handleModuleSelection}
                  handleModuleSelection={this.handleModuleSelection}
                  handleFooterSelection={this.handleModuleSelection}
                  headerSelection={this.state.headerSelection}
                  moduleSelection={this.state.moduleSelection}
                  footerSelection={this.state.footerSelection}
                  sidebarVisibility={this.state.sidebarVisibility} /> }/>
              <Route path="/finishedpages" component={FinishedPage} />
              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
        </div>
      </Router>
    );
  }
}
