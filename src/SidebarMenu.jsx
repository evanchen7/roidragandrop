import React, { Component } from 'react'
import { Confirm, Menu, Icon, Header, Modal, Grid, Image } from 'semantic-ui-react'
import ModalForm from './ModalForm';

export default class SidebarMenu extends Component {
  state = { open: false, "modalOpenSave": false, "modalOpenScreenShot": false }

  show = () => this.setState({ open: true });
  handleConfirm = () => this.setState({ open: false });
  handleCancel = () => this.setState({ open: false });
  handleOpenSave = () => this.setState({ modalOpenSave: true });
  handleCloseSave = () => this.setState({ modalOpenSave: false });
  handleOpenScreenshot = () => this.setState({ modalOpenScreenShot: true });
  handleCloseScreenshot = () => this.setState({ modalOpenScreenShot: false });

  render() {
    return (
      <div>
           <Menu floated="right"  compact="true" size="mini">
                <Menu.Item name='Header' onClick={() => this.props.handleAddModules("Header")}>
                <Icon name='arrow down' />
                    Header
                </Menu.Item>
                <Menu.Item name='Header' onClick={() => this.props.handleAddModules("unshift Header")}>
                <Icon name='arrow up' />
                    Header
                </Menu.Item>
                <Menu.Item name='Module' onClick={() => this.props.handleAddModules("Module")}>
                <Icon name='arrow down' />
                    Module
                </Menu.Item>
                <Menu.Item name='Module' onClick={() => this.props.handleAddModules("unshift Module")}>
                <Icon name='arrow up' />
                    Module
                </Menu.Item>
                <Menu.Item name='Footer' onClick={() => this.props.handleAddModules("Footer")}>
                <Icon name='arrow down' />
                    Footer
                </Menu.Item>
                <Menu.Item name='Footer' onClick={() => this.props.handleAddModules("unshift Footer")}>
                <Icon name='arrow up' />
                    Footer
                </Menu.Item>
                <Menu.Item name='Reset' onClick={this.show} >
                <Icon name='refresh' />
                    Reset
                </Menu.Item>
                <Menu.Item name='Save' onClick={this.handleOpenScreenshot} >
                <Icon name='save' />
                    Save
                </Menu.Item>
            </Menu>
            <Confirm
                open={this.state.open}
                onConfirm={ () => { this.props.resetModules();  this.handleCancel()} }
                onCancel={this.handleCancel}
            />
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
    )
  }
}