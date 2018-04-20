import React, { Component } from 'react';
import { Dropdown, Input } from 'semantic-ui-react';

export default class Modules extends Component {

  state = { value: this.props.moduleName, dropDownStatus: false, options: null }

  changeField = (e, data) => {
    this.setState( { value: data.text} );
    this.props.dropDown(e, data);
  }

  handleDropDownState = () => this.setState({ dropDownStatus: !this.state.dropDownStatus });

  handleInput = (event, data) => {
    let options = this.state.options.filter((item) => {
      return item.text.toLowerCase().indexOf(data.value.toLowerCase()) > -1;
    })
    this.setState({options});
  }

  loadTransformProps = () => {
    const transformData = () => this.props.data.map((item) => {
      return {
        "text": item.title.rendered,
        "key": item.id,
        "url": item.acf.image_upload.url,
        "id": item.id,
        "image": {
          "src": item.acf.image_upload.sizes.thumbnail
        }
      };
    });
    const options = transformData();
    this.setState((prevState, props) => ({
      options: options
    }));
  }

  componentDidMount() {
    this.loadTransformProps();
  }

  render() {
    const { value } = this.state;

    return (
        <li>
          <Dropdown
            error={!this.state.options}
            text={`${value}`}
            open={this.state.dropDownStatus}
            onMouseEnter={this.handleDropDownState}
            onMouseLeave={this.handleDropDownState}
            icon='filter'
            className='icon'
            fluid labeled button scrolling
            >
            <Dropdown.Menu>
            {
              !this.state.options ?
              <Dropdown.Header icon='sidebar' content='Search is loading...' /> :
              <Dropdown.Header icon='sidebar' content='Search...' /> }
             <Input icon='search' iconPosition='left' name='search ' onChange={this.handleInput} />
             <Dropdown.Divider />
             <Dropdown.Header icon='sidebar' content='Select a Module' />
              <Dropdown.Menu scrolling>
                  {
                    this.state.options ?
                    this.state.options.map(option =>
                    <Dropdown.Item
                      key={option.value}
                      {...option}

                      onClick={this.changeField}
                      something={[this.props.moduleName]}
                      /> ) :
                    <Dropdown.Item value='Loading..'/>
                  }
              </Dropdown.Menu>
            </Dropdown.Menu>
          </Dropdown>
        </li>
    );
  }
}