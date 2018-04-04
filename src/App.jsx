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
      savedData: {},
      error: null,
    };
    this.grabDataFromWordPress = this.grabDataFromWordPress.bind(this);
    this.handleHeaderSelection = this.handleHeaderSelection.bind(this);
    this.handleModuleSelection = this.handleModuleSelection.bind(this);
    this.handleFooterSelection = this.handleFooterSelection.bind(this);
  }

  componentDidMount() {
    this.grabDataFromWordPress();
  }

  captureScreen() {
    html2canvas(document.querySelector("#main"),
    {letterRendering: 1, allowTaint : true, onrendered : (canvas) => { } })
      .then(canvas => { document.body.appendChild(canvas)
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
    return (
      <div className="wrapper">
        <Headers saveScreenshot={this.captureScreen}/>

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

           <div>
             <h2>Draggable Module Tool</h2>
            <main id = "main" >
              <div className = "row">
                <div id = "header" className = "destination small-12">
                  {this.state.headerSelection ? <Image src={this.state.headerSelection.url}/>: <h2>Header</h2>}

                </div>
                <div id = "module" className = "destination small-12">
                  <h2>Modules</h2>
                  {this.state.moduleSelection ? <Image src={this.state.moduleSelection.url}/>: <h2>Module</h2>}
                </div>
                <div id = "footer" className= "destination small-12">
                  <h2>Footer</h2>
                  {this.state.footerSelection ? <Image src={this.state.footerSelection.url}/>: <h2>Footer</h2>}
                </div>
              </div>
            </main>
          </div>
      </div>

    );
  }
}
