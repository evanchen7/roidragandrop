import React, { Component } from 'react';
import { Dropdown, Input } from 'semantic-ui-react';
import './css/main.css';

export default class OldModules extends Component {

  state = {
    value: this.props.moduleName,
    dropDownStatus: false,
    options: null,
    classStatus: false,
    showClass: "open"
  }

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
        },
        "tags": item.acf.tags.map((tag) => tag.name)
      };
    });
    const options = transformData();
    this.setState((prevState, props) => ({
      options: options
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

  handleClass = () => {
    this.setState({
      classStatus: !this.state.classStatus
    })
  }
  removeNumbers = (item) =>  item.replace(/[0-9]/g, '');
  forceLeave = () => this.setState({ dropDownStatus: false});

  componentDidMount() {
    this.loadTransformProps();
  }

  render() {
    const { value, classStatus, showClass } = this.state;
    const style1 = {
      "padding": "7px 15px 6px",
      "marginRight": "2px",
      "background": "#8cc800"
    }
    const style2 = {
      "background": "url(../img/add-button.svg) no-repeat center center",
      "padding": "0px 10px"
    }
    return (
        <li>
          <div onClick={this.handleDropDownState} style={style1}><i style={style2}/></div>
          <div onClick={this.handleDropDownState} className={`menu-content ${classStatus ? showClass : ""}`}>
            <a  className='menu-open-link' onClick={() => {this.handleDropDownState()}}>

                <Dropdown
                error={!this.state.options}
                text={`${value}`}
                open={this.state.dropDownStatus}
                // onMouseEnter={this.handleDropDownState}
                // onMouseLeave={this.forceLeave}
                icon=''
                labeled
                as='div'
                // style={{"float":"top"}}
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
                          onClick={(e, data)=>{this.changeField(e, data); this.forceLeave()}}
                          something={[this.props.moduleName]}
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