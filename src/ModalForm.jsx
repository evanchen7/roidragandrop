import React, { Component } from 'react';
import { Button, Form, Label, Icon, Modal, Loader, Dimmer, Message } from 'semantic-ui-react';

export default class ModalForm extends Component {
  render() {
    let buttonDisable =
      this.props.updatedFormValues.authorName &&
      this.props.updatedFormValues.authorEmail &&
      this.props.updatedFormValues.projectTitle &&
      this.props.updatedFormValues.previewScreenshot !== null;
    let { dataSaveStatus } = this.props;
    dataSaveStatus = JSON.parse(dataSaveStatus);

    return (
      <Form>
        <Form.Field>
          <Label color="grey" >Author Name</Label>
          <input
            placeholder='Author Name'
            value={this.props.updatedFormValues.authorName}
            onChange={this.props.handleName}/>
        </Form.Field>
        <Form.Field>
          <Label color="grey" >Author Email</Label>
          <input
            placeholder='Author Email'
            value={this.props.updatedFormValues.authorEmail}
            onChange={this.props.handleEmail}/>
        </Form.Field>
        <Form.Field>
          <Label color="grey" >Project Title</Label>
          <input
            placeholder='Project Title'
            value={this.props.updatedFormValues.projectTitle}
            onChange={this.props.handleProjectTitle}/>
        </Form.Field>
        <Button size='large' color='grey' onClick={this.props.previewScreenshot} inverted animated>
          <Button.Content visible>Preview</Button.Content>
          <Button.Content hidden>
            <Icon fitted name='photo'/>
          </Button.Content>
        </Button>
        <Modal
            trigger = {<Button
            size='large'
            color='blue'
            onClick={this.props.saveScreenshot}
            disabled={buttonDisable ? false :true}
            inverted animated>
            <Button.Content visible>Submit</Button.Content>
            <Button.Content hidden>
              <Icon fitted name='save'/>
            </Button.Content>
          </Button>}>
          <Modal.Content>

            { console.log(this.props.dataSaveStatus)}
            { dataSaveStatus ?
              <Message>
                <Message.Header>
                  Your post was saved!
                </Message.Header>
                <Message.Item>Post ID: {dataSaveStatus.id}</Message.Item>
                <Message.Item>Project Title: {dataSaveStatus.title}</Message.Item>
                <Message.Item>Name: {dataSaveStatus.name}</Message.Item>
                <Message.Item>Email: {dataSaveStatus.email}</Message.Item>
                <Message.Item>Find your link at: {dataSaveStatus.link}</Message.Item>
              </Message>
              :
              <Dimmer active>
                <Loader inverted content='Saving to server, please wait...' />
              </Dimmer>
            }
          </Modal.Content>
        </Modal>
      </Form>
    );
  }
}
