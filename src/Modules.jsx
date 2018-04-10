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
        compact
        placeholder={`${this.props.moduleName}`}
        openOnFocus
        selection
        value={value}
        onChange={this.props.handleSelection}
        search
        onSearchChange={this.handleSearchChange}
        options={convertedData}
        icon ='plus' fluid floating labeled button className='icon'>
      </Dropdown>
    );
  }
}
