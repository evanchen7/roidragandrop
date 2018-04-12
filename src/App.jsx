import React, { Component } from 'react';
import axios from 'axios';
import WPAPI from 'wpapi';
import { Image } from 'semantic-ui-react';
import html2canvas from 'html2canvas';
import Headers from './Header';
import Modules from './Modules';
import './css/main.css';

const HEADER = 'https://damcms.roidna.com/wp-json/wp/v2/header';
const MODULE = 'https://damcms.roidna.com/wp-json/wp/v2/module';
const FOOTER = 'https://damcms.roidna.com/wp-json/wp/v2/footer';

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
      previewScreenshot: {},
      authorName: '',
      authorEmail: '',
      projectTitle: '',
      dataSaveStatus: null,
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
    }).catch((err) => {
      let error = { ...this.state.error, [err]: err}
      this.setState({error});
    });
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

    const wp = new WPAPI({
      endpoint: 'http://roidnadam.local/wp-json',
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
    const generateImage = () => {
      return (
        `<img src=${this.state.headerSelection.url} />
        <img src=${this.state.moduleSelection.url} />
        <img src=${this.state.footerSelection.url} />`
      )
    }

    if (!postData) {
      let error = "No Post Data!"
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
          dataSaveStatus={this.state.dataSaveStatus}
          updatedFormValues={updatedFormValues}
          handleName={this.handleName}
          handleEmail={this.handleEmail}
          handleProjectTitle={this.handleProjectTitle}
          previewScreenshot={this.previewScreenshot}
          saveScreenshot={this.saveScreenshot}/>
      <div id = "menu">
        <ul>
          <li>
            <div >
              <Modules
                data={this.state.header}
                moduleName={"Header"}
                handleSelection={this.handleHeaderSelection}/>
              </div>
          </li>
          <li>
            <div >
              <Modules
                data={this.state.module}
                moduleName={"Module"}
                handleSelection={this.handleModuleSelection}/>
              </div>
            </li>
            <li>
              <div >
                <Modules
                  data={this.state.footer}
                  moduleName={"Footer"}
                  handleSelection={this.handleFooterSelection}/>
                </div>
            </li>
          </ul>
        </div>

           <div>
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
