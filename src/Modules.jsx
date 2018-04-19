import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import './css/main.css';

export default class Modules extends Component {

  state = { searchQuery: ''}

  handleSearchChange = (e, { searchQuery }) => {
    this.setState( { searchQuery });
  }

  handleThis = (e, t) => {
    console.log(e)
    console.log("Event ", t)
  }

  render() {
    const convertedData = this.props.data.map((item) => {
      return {
        "key": item.id,
        "text": item.title.rendered,
        "value": {
          "id": item.id,
          "url": item.acf.image_upload.url,
          "text": item.title.rendered
        },
        "image": {
        "src": item.acf.image_upload.sizes.thumbnail
        }
      };
    });
    const { searchQuery, value } = this.state;

    return (
          <Dropdown
            placeholder={`${this.props.moduleName}`}
            something={[this.props.moduleName]}
            onChange={this.props.dropDown}
            onSearchChange={this.handleSearchChange}
            options={convertedData}
            value={value}
            icon="search"
            pointing="left"
            openOnFocus selection search labeled>
          </Dropdown>
    );
  }
}
