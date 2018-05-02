import React, { Component } from 'react';
import { Confirm, Icon, Header, Modal, Grid, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import ModalForm from './ModalForm';
import './css/main.css';

export default class OldHeader extends Component {
  state = { open: false, "modalOpenSave": false, "modalOpenScreenShot": false }

  show = () => this.setState({ open: true });
  handleConfirm = () => this.setState({ open: false });
  handleCancel = () => this.setState({ open: false });
  handleOpenSave = () => this.setState({ modalOpenSave: true });
  handleCloseSave = () => this.setState({ modalOpenSave: false });
  handleOpenScreenshot = () => this.setState({ modalOpenScreenShot: true });
  handleCloseScreenshot = () => this.setState({ modalOpenScreenShot: false });

  handleDropDown = () => {
//     <Dropdown
//     icon={false}
//     text='Tools'
//     as='a'
//     className="button pill small"

//     >
//     <Dropdown.Menu>
//     <Dropdown.Item >
//         <Dropdown text='Headers' direction='right' fluid >
//         <Dropdown.Menu >
//             <Dropdown.Item icon='arrow down' text="Add to Bottom" onClick={() => this.props.handleAddModules("unshift Header")}/>
//             <Dropdown.Item icon='arrow up' text="Add to Top"  onClick={() => this.props.handleAddModules("Header")}/>
//         </Dropdown.Menu>
//         </Dropdown>
//     </Dropdown.Item>
//     <Dropdown.Item >
//         <Dropdown text='Modules' direction='right' fluid >
//         <Dropdown.Menu >
//             <Dropdown.Item icon='arrow down' text="Add to Bottom" onClick={() => this.props.handleAddModules("unshift Module")}/>
//             <Dropdown.Item icon='arrow up' text="Add to Top" onClick={() => this.props.handleAddModules("Module")}/>
//         </Dropdown.Menu>
//         </Dropdown>
//     </Dropdown.Item>
//     <Dropdown.Item >
//         <Dropdown text='Footer' direction='right' fluid >
//         <Dropdown.Menu >
//             <Dropdown.Item icon='arrow down' text="Add to Bottom" onClick={() => this.props.handleAddModules("unshift Footer")}/>
//             <Dropdown.Item icon='arrow up' text="Add to Top" onClick={() => this.props.handleAddModules("Footer")}/>
//         </Dropdown.Menu>
//         </Dropdown>
//     </Dropdown.Item>

//     <Dropdown.Divider />
//     <Dropdown.Item text='Reset' icon='refresh' onClick={this.show}/>
//     <Dropdown.Item text='Save' icon='save' onClick={this.handleOpenScreenshot}/>
//     </Dropdown.Menu>
//   </Dropdown>
  }

  render() {
    return (
        <header>
            <div className="row align-justify">
                <div >
                    <Link to="/">
                      <img src = "./img/logo.svg" className="logo" alt="logo"/>
                    </Link>
                </div>

                <div className="columns right">
                  {/* <Link to="/finishedpages" className="button pill small">Pages</Link> */}
                  <a className="button pill small refresh" onClick={this.show}><i className="fa fa-repeat" /> Refresh</a>
                  <a className="button pill small" onClick={this.handleOpenScreenshot}><i className="fa fa-download" />  Save</a>
                  <a className="sign-out"><i className="fa fa-user-o"></i> Sign Out</a>
                </div>
                <Confirm
                open={this.state.open}
                header='Resets all modules'
                onConfirm={ () => { this.props.resetModules();  this.handleCancel()} }
                onCancel={this.handleCancel} />
                <Modal
                    open={this.state.modalOpenScreenShot}
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
                            <Image size="large" id="newScreenshot" src="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/160ae39d-b5b0-4d9f-a8e1-76102113e2f8/placeholder-picture-large-opt.png"/>
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
        </header>
    );
  }
}