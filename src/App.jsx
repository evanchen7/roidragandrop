import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Image, Icon } from 'semantic-ui-react';
import html2canvas from 'html2canvas';
import Headers from './Header';
import Modules from './Modules';
import './css/main.css';

const HEADER = 'https://damcms.roidna.com/wp-json/wp/v2/header';
const MODULE = 'https://damcms.roidna.com/wp-json/wp/v2/module';
const FOOTER = 'https://damcms.roidna.com/wp-json/wp/v2/footer';
const FINISHEDPAGES = 'http://roidnadam.local/wp-json/wp/v2/finished_page'; // Change for testing

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
      previewScreenshot: null,
      authorName: '',
      authorEmail: '',
      projectTitle: '',
      error: null,
    };
    this.grabDataFromWordPress = this.grabDataFromWordPress.bind(this);
    this.handleHeaderSelection = this.handleHeaderSelection.bind(this);
    this.handleModuleSelection = this.handleModuleSelection.bind(this);
    this.handleFooterSelection = this.handleFooterSelection.bind(this);
    this.previewScreenshot = this.previewScreenshot.bind(this);
    this.saveScreenshot = this.saveScreenshot.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleProjectTitle = this.handleProjectTitle.bind(this);
  }

  componentDidMount() {
    this.grabDataFromWordPress();
  }

  previewScreenshot() {
    html2canvas(document.querySelector("#screenshotarea"), { letterRendering: 1, useCORS : true })
      .then(canvas => {
        canvas.id = "canvascapture";
        let dataURL = canvas.toDataURL('image/png', 1.0);
        document.querySelector("#newScreenshot").src = dataURL;
        return dataURL;
    }).then((preview) => { this.setState({ previewScreenshot: preview })});
  }

  handleName(e) {
    let value = e.target.value;
    this.setState((prevState, props) => ({
        authorName: value
    }));
  }

  handleEmail(e) {
    let value = e.target.value;
    this.setState((prevState, props) => ({
        authorEmail: value
    }));
  }

  handleProjectTitle(e) {
    let value = e.target.value;
    this.setState((prevState, props) => ({
        projectTitle: value
    }));
  }

  saveScreenshot(e) {
    e.preventDefault();
    let postData = {
      authorName: this.state.authorName,
      authorEmail: this.state.authorEmail,
      projectTitle: this.state.projectTitle,
      previewScreenshot: this.state.previewScreenshot
    }
    console.log(postData)
    this.setState((prevState, props) => ({
        authorName: '',
        authorEmail: '',
        projectTitle: '',
        previewScreenshot: {}
    }));
    // let details = {};
    // axios.post(FINISHEDPAGES, details)
    //   .then(response => console.log(response))
    //   .catch(error => this.setState({error}));
  }

  grabDataFromWordPress() {
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

  handleHeaderSelection(e, selection) {
    this.setState({
      "headerSelection": selection.value
    })
  }

  handleModuleSelection(e, selection) {
    this.setState({
      "moduleSelection": selection.value
    })
  }

  handleFooterSelection(e, selection) {
    this.setState({
      "footerSelection": selection.value
    })
  }

  render() {
    const { authorName, authorEmail, projectTitle, previewScreenshot } = this.state;
    const updatedFormValues = {
      authorName, authorEmail, projectTitle, previewScreenshot
    };
    return (
      <div className="wrapper">
        <Headers
          updatedFormValues={updatedFormValues}
          handleName={this.handleName}
          handleEmail={this.handleEmail}
          handleProjectTitle={this.handleProjectTitle}
          previewScreenshot={this.previewScreenshot}
          saveScreenshot={this.saveScreenshot}/>

            <div >
             <Modules
               data={this.state.header}
               moduleName={"Header"}
               handleSelection={this.handleHeaderSelection}/>
           </div>
            <div>
             <Modules
               data={this.state.module}
               moduleName={"Module"}
              handleSelection={this.handleModuleSelection}/>
           </div>
            <div >
             <Modules
               data={this.state.footer}
               moduleName={"Footer"}
               handleSelection={this.handleFooterSelection}/>
           </div>

           <div >
            <main id = "main" className="text-center">
              <h2>Draggable Module Tool</h2>
              <div id ="screenshotarea" className = "row target-body">
                <div id = "header" className = "destination small-12">
                  {this.state.headerSelection ? <Image src={this.state.headerSelection.url}/>: <h2>Header</h2>}
                </div>
                <div id = "module" className = "destination small-12">
                  {this.state.moduleSelection ? <Image src={this.state.moduleSelection.url}/>: <h2>Module</h2>}
                </div>
                <div id = "footer" className= "destination small-12">
                  {this.state.footerSelection ? <Image src={this.state.footerSelection.url}/>: <h2>Footer</h2>}
                </div>
              </div>
            </main>
          </div>
      </div>

    );
  }
}
