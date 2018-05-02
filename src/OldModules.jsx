import React, { Component } from 'react';
import { Dropdown, Input, Loader } from 'semantic-ui-react';
import Background from './img/add-button.svg';
import './css/main.css';

export default class OldModules extends Component {

  state = {
    dropDownStatus: false,
    options: null,
    classStatus: false,
    showClass: "open"
  }

  handleClass = () => this.setState({ classStatus: !this.state.classStatus });
  removeNumbers = (item) =>  item.replace(/[0-9]/g, '');
  forceLeave = () => this.setState({ dropDownStatus: false});

  changeField = (e, data) => {
    this.setState( { value: data.text} );
    this.props.dropDown(e, data);
  }

  transformData = () => this.props.data.map((item) => {
    return {
      "text": item.title.rendered,
      "key": item.id,
      "url": item.acf.image_upload.url,
      "id": item.id,
      "image": {
        "src": item.acf.image_upload.sizes.thumbnail
      },
      "tags": item.acf.tags.map((tag) => tag.name)
    };
  });

  handleInput = (event, data) => {
    let target = data.value;
    let options = this.transformData().filter((item) => {
      return item.text.toLowerCase().indexOf(target.toLowerCase()) > -1;
    });
    this.setState({options});
  }

  loadTransformProps = () => {
    this.setState((prevState, props) => ({
      options: this.transformData()
    }));
  }

  loadMenu = () => {
    const { options, classStatus } = this.state;

    if (!options) return <h5>Loading...</h5>

    return options.map((item) => {
      console.log(item)
      return (
        <div className = "small-12 modules header-modules header-tags" data-type = "header">
           <span style={  classStatus? {"display":"block"}: {"display":"none"}}>
            {item.tag}
           </span>
           <h5>{item.text}</h5>
           <img src={item.url} alt={`${item.text}`}/>
        </div>
      )
    })
  }

  checkIfModule = () => {
    if (this.removeNumbers(this.props.moduleName) === "Module") {
        this.props.handleAddModuleOnly("Module");
    }
  }

  componentDidMount() {
    this.loadTransformProps();
  }

  render() {
    const { dropDownStatus, options } = this.state;
    const { moduleName } = this.props;
    const style1 = {
      "padding": "7px 15px 6px",
      "marginRight": "2px",
      "background": "#8cc800"
    }
    const style2 = {
      "background": `url(${Background}) no-repeat center center`,
      "padding": "0px 10px"
    }
    return (
      !moduleName ? <div style={{"float":""}}><Loader active size='massive' inline='true'>Loading</Loader></div> :
        <li>
          <div style={style1} >
            <i style={style2} onClick={this.checkIfModule} />
          </div>
          <div className='menu-content'>
            <a className='menu-open-link' >
                <Dropdown
                loading={!options ? true : false}
                text={moduleName}
                open={dropDownStatus}
                onClick={() => this.setState({dropDownStatus: true})}
                fluid
                floating
                labeled
                direction='right'
                onBlur={() => this.setState({dropDownStatus: false})}
                >
                <Dropdown.Menu>
                { !options ?
                  <Dropdown.Header icon='sidebar' content='Search is loading...' /> :
                  <Dropdown.Header icon='sidebar' content='Search...' /> }
                <Input icon='search' iconPosition='left' name='search ' onChange={this.handleInput} />
                <Dropdown.Divider />
                <Dropdown.Header icon='sidebar' content='Select a Module' />
                  <Dropdown.Menu scrolling>
                      {
                        options ?
                        options.map(option =>
                        <Dropdown.Item
                          key={option.value}
                          {...option}
                          onClick={(e, data)=>{this.changeField(e, data);}}
                          something={[moduleName]}
                          /> ) :
                        <Dropdown.Item value='Loading..'/>
                      }
                  </Dropdown.Menu>
                </Dropdown.Menu>
              </Dropdown>
          </a>
          </div>
        </li>
    );
  }
}