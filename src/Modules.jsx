import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import './css/main.css';

export default class Modules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e, { searchQuery }) {
    this.setState( { searchQuery });
  }

  render() {
    const convertedData = this.props.data.map((item) => {
      return {
        "key": item.id,
        "text": item.title.rendered,
        "value": {
          "id": item.id,
          "url": item.acf.image_upload.url
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
            onChange={this.props.handleSelection}
            onSearchChange={this.handleSearchChange}
            options={convertedData}
            value={value}
            icon="search"
            pointing="left"
            openOnFocus selection search floating inline labeled>
          </Dropdown>
    );
  }
}
