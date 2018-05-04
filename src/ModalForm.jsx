import React, { Component } from 'react';
import { Button, Form, Label, Modal, Loader, Dimmer, Message } from 'semantic-ui-react';

export default class ModalForm extends Component {
  state = { saveDisable: false }
  render() {
    let buttonDisable =
      this.props.updatedFormValues.authorName &&
      this.props.updatedFormValues.authorEmail &&
      this.props.updatedFormValues.projectTitle &&
      this.props.updatedFormValues.previewScreenshot !== null;
    let { dataSaveStatus, previewScreenshot, handleName, updatedFormValues, handleEmail, handleProjectTitle, wordpressData, wordpressSave } = this.props;
    dataSaveStatus = JSON.parse(dataSaveStatus);

    return (
      <Form>
        <Form.Field>
          <Label color="grey" >Author Name</Label>
          <input
            placeholder='Author Name'
            value={updatedFormValues.authorName}
            onChange={handleName}/>
        </Form.Field>
        <Form.Field>
          <Label color="grey" >Author Email</Label>
          <input
            placeholder='Author Email'
            value={updatedFormValues.authorEmail}
            onChange={handleEmail}/>
        </Form.Field>
        <Form.Field>
          <Label color="grey" >Project Title</Label>
          <input
            placeholder='Project Title'
            value={updatedFormValues.projectTitle}
            onChange={handleProjectTitle}/>
        </Form.Field>

 <Modal
            trigger = { <Button
              content='Save WP'
              size='medium'
              disabled={this.state.saveDisable ? false :true}
              onClick={this.props.savePNGToAPI}
              inverted  />
            }>
          <Modal.Content>
            { wordpressSave ?
              <Message>
                <Message.Header>
                  Your stiched photo can now be view under the pages tab
                </Message.Header>
                <Message.Item>Link: {wordpressData}</Message.Item>
              </Message>
              :
              <Dimmer active>
                <Loader inverted content='Saving to wordpress, please wait...' />
              </Dimmer>
            }
          </Modal.Content>
        </Modal>
        <Button
          content='Preview'
          size='medium'
          onClick={() => { previewScreenshot(); this.setState({ saveDisable: true })}}
          inverted  />
        <Modal
            trigger = {<Button
            content='Submit'
            size='medium'
            onClick={this.props.saveScreenshot}
            inverted
            disabled={buttonDisable ? false :true}
            />
            }>
          <Modal.Content>
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
