import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import axios from 'axios';
import ModalForm from './ModalForm';
import './css/main.css';

export default class Headers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "modalOpen": false
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  // {this.state.headerSelection && this.state.moduleSelection && this.state.footerSelection ?
  //  <button onClick={this.captureScreen}><Icon name='plus'>Select</Icon></button> :
  //  <button value="All Modules"><Icon name='plus'/>Not Ready</button>
  // }

  render() {
    return (
        <header>
            <div className = "row align-justify">
                <div className = "columns">
                    <img src = "img/logo.svg" className = "logo" alt="logo"/>
                </div>

                <div className = "columns right">
                  <a  onClick={this.props.saveScreenshot} className = "button pill small">Screenshot</a>
                  <div onClick={this.handleOpen}>
                    <Modal
                        trigger={<a  className = "button pill small">Save</a>}
                        open={this.state.modalOpen}
                        onClose={this.handleClose}
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
                          <Button color='red' onClick={this.handleClose} inverted>
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
