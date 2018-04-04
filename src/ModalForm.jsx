import React, { Component } from 'react';
import { Button, Checkbox, Form, Label } from 'semantic-ui-react';
const color = {"background-color": "#8cc800", "color": "#333"};

export default class ModalForm extends Component {
  render() {
    return (
      <Form className={color}>
        <Form.Field className={color}>
          <Label className={color}>Author Name</Label>
          <input placeholder='Author Name' />
        </Form.Field>
        <Form.Field>
          <Label className={color}>Author Email</Label>
          <input placeholder='Author Email' />
        </Form.Field>
        <Form.Field>
          <Label className={color}>Project Title</Label>
          <input placeholder='Project Title' />
        </Form.Field>
      </Form>
    );
  }
}
