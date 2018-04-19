import React, { Component } from 'react';
import { Header, Icon, Modal, Grid, Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import ModalForm from './ModalForm';
import './css/main.css';

export default class Headers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "modalOpenSave": false,
      "modalOpenScreenShot": false
    }
  }

  handleOpenSave = () => this.setState({ modalOpenSave: true });

  handleCloseSave = () => this.setState({ modalOpenSave: false });

  handleOpenScreenshot = () => this.setState({ modalOpenScreenShot: true });

  handleCloseScreenshot = () => this.setState({ modalOpenScreenShot: false });


  render() {
    return (
        <header>
            <div className="row align-justify">
                <div >
                    <Link to="/">
                      <img src = "img/logo.svg" className="logo" alt="logo"/>
                    </Link>
                </div>

                <div className="columns right">
                  <Link to="/finishedpages" className="button pill small">Finished Pages</Link>
                  <a className="button pill small" onClick={this.props.handleOptionsSidebar}>Menu</a>
                  <div onClick={this.handleOpenScreenshot}>
                  <Modal
                      trigger={<a className="button pill small">Save</a>}
                      open={this.state.handleCloseSave}
                      onClose={this.handleCloseScreenshot}
                      basic
                      dimmer='blurring'
                      size='large'>
                      <Header textAlign='center'>
                        <Header.Content>
                        <Icon name='photo' />Save Screenshot
                        </Header.Content>
                      </Header>
                        <br />
                      <Grid centered columns={2}>
                          <Modal.Content image scrolling>
                              <Image size="large" id="newScreenshot" src="https://www.webpagefx.com/blog/images/cdn.designinstruct.com/files/582-how-to-image-placeholders/generic-image-placeholder.png"></Image>
                          </Modal.Content>
                        <Modal.Actions>
                          <ModalForm
                            dataSaveStatus={this.props.dataSaveStatus}
                            updatedFormValues={this.props.updatedFormValues}
                            handleName={this.props.handleName}
                            handleEmail={this.props.handleEmail}
                            handleProjectTitle={this.props.handleProjectTitle}
                            previewScreenshot={this.props.previewScreenshot}
                            saveScreenshot={this.props.saveScreenshot}/>
                        </Modal.Actions>
                      </Grid>
                    </Modal>
                  </div>
                    <a className="sign-out"><i className="fa fa-user-o"></i> Sign Out</a>
                </div>
            </div>
        </header>
    );
  }
}
