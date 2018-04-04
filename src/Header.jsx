import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Grid, Image } from 'semantic-ui-react';
import axios from 'axios';
import ModalForm from './ModalForm';
import './css/main.css';

export default class Headers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "modalOpenSave": false,
      "modalOpenScreenShot": false
    }
    this.handleOpenSave = this.handleOpenSave.bind(this);
    this.handleCloseSave = this.handleCloseSave.bind(this);
    this.handleOpenScreenshot = this.handleOpenScreenshot.bind(this);
    this.handleCloseScreenshot = this.handleCloseScreenshot.bind(this);
  }

  handleOpenSave() {
    this.setState({ modalOpenSave: true });
  }

  handleCloseSave() {
    this.setState({ modalOpenSave: false });
  }

  handleOpenScreenshot() {
    this.setState({ modalOpenScreenShot: true });
  }

  handleCloseScreenshot() {
    this.setState({ modalOpenScreenShot: false });
  }

  render() {
    return (
        <header>
            <div className = "row align-justify">
                <div className = "columns">
                    <img src = "img/logo.svg" className = "logo" alt="logo"/>
                </div>

                <div className = "columns right">
                  <div onClick={this.handleOpenScreenshot}>
                  <Modal
                      trigger={<a  className = "button pill small">Screenshot</a>}
                      open={this.state.handleCloseSave}
                      onClose={this.handleCloseScreenshot}
                      basic
                      size='large'
                    >
                      <Header icon='camera' content='Take a screenshot' />
                      <Grid centered>
                      <Modal.Content size="large">

                            <Image size="large" id="screenshot1" src="https://pbs.twimg.com/media/DYCcriDUQAAudCP.jpg"></Image>

                      </Modal.Content>

                      <Modal.Actions>
                        <ModalForm/>
                        <br/>
                        <Button color='green' onClick={this.props.saveScreenshot} inverted>
                          <Icon name='checkmark' /> Screenshot
                        </Button>
                        <Button color='blue' onClick={console.log} inverted>
                          <Icon name='arrow right'/> Save Image
                       </Button>
                      </Modal.Actions>
                      </Grid>
                    </Modal>
                  </div>

                  <div onClick={this.handleOpenSave}>
                    <Modal
                        trigger={<a  className = "button pill small">Save</a>}
                        open={this.state.modalOpenSave}
                        onClose={this.handleCloseSave}
                        basic
                        size='small'
                      >
                        <Header icon='browser' content='Make POST request to WP API' />
                        <Modal.Content>
                          <ModalForm />
                        </Modal.Content>
                        <Modal.Actions>
                          <Button color='green' onClick={console.log} inverted>
                            <Icon name='checkmark' /> Save
                          </Button>
                          <Button color='red' onClick={this.handleCloseSave} inverted>
                            <Icon name='cancel'/>Cancel
                         </Button>
                        </Modal.Actions>
                      </Modal>

                  </div>
                    <a  className = "sign-out"><i className = "fa fa-user-o"></i> Sign Out</a>
                </div>
            </div>
        </header>
    );
  }
}

{/* <div id = "save-dam" class = "tiny reveal" data-reveal>
        <form class = "row">
            <div class = "small-12">
                <label>Save as</label>
            </div>

            <div class = "small-12">
                <input type = "text" placeholder = "Lorem ipsum" />
            </div>

            <div class = "small-12">
                <button type = "submit" class = "button pill">Save</button>
            </div>

            <div class = "small-12">
                <button class = "button pill cancel">Cancel</button>
            </div>
        </form>
    </div> */}
