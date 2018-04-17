import React, { Component } from 'react';
import { Button, Form, Label, Icon, Modal, Loader, Dimmer } from 'semantic-ui-react';

export default class ModalForm extends Component {
  render() {
    let buttonDisable =
      this.props.updatedFormValues.authorName &&
      this.props.updatedFormValues.authorEmail &&
      this.props.updatedFormValues.projectTitle &&
      this.props.updatedFormValues.previewScreenshot !== null;
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
            { this.props.dataSaveStatus ?
              <h2>Post: {this.props.dataSaveStatus} saved to WordPress</h2> :
              <Dimmer active>
                <Loader content='Loading' />
              </Dimmer>
            }
          </Modal.Content>
        </Modal>
      </Form>
    );
  }
}
