import React, { Component } from 'react';
import { Image, Button, Icon, Header, Menu, Segment, Sidebar } from 'semantic-ui-react';
import Modules from './Modules';
import './css/main.css';

// TODO MAP MODULES

export default class Main extends Component {

    state = { visible: false }

    toggleVisibility = () => this.setState({ visible: !this.state.visible });

    generateModules = () => {
        const mapModuleNames = {
            "Header": {
                value: "Header",
                data: this.props.header,
                handleSelection: this.props.handleHeaderSelection
            },
            "Module": {
                value: "Module",
                data: this.props.module,
                handleSelection: this.props.handleModuleSelection
            },
            "Footer": {
                value: "Footer",
                data: this.props.footer,
                handleSelection: this.props.handleFooterSelection
            }
        }

        return this.props.initialModules.map((mod) => {
            return (
                <div key={mod}>
                    <Modules
                      data={mapModuleNames[mod].data}
                      moduleName={mod}
                      handleSelection={mapModuleNames[mod].handleSelection}
                    />
                </div>
            )
        });
    }

    render () {
        const { sidebarVisibility } = this.props;

        return (
            <div>
                 <div id="menu">
                    {this.generateModules()}

                        {/* <div>
                            <Modules
                                data={this.props.header}
                                moduleName={"Header"}
                                handleSelection={this.props.handleHeaderSelection}/>
                        </div>
                        <div>
                            <Modules
                                data={this.props.module}
                                moduleName={"Module"}
                                handleSelection={this.props.handleModuleSelection}/>
                         </div>
                         <div>
                                <Modules
                                data={this.props.footer}
                                moduleName={"Footer"}
                                handleSelection={this.props.handleFooterSelection}/>
                        </div> */}

                </div>
            <Sidebar.Pushable >
                <Sidebar  animation='overlay' direction='top' visible={sidebarVisibility} inverted>
                    <Menu floated="right"  >
                        <Menu.Item name='Header' onClick={console.log}>
                        <Icon name='plus' />
                            Header
                        </Menu.Item>
                        <Menu.Item name='Module' onClick={console.log}>
                        <Icon name='plus' />
                            Module
                        </Menu.Item>
                        <Menu.Item name='Footer' onClick={console.log}>
                        <Icon name='plus' />
                            Footer
                        </Menu.Item>
                        <Menu.Item name='Reset' onClick={console.log} >
                        <Icon name='refresh' />
                            Reset
                        </Menu.Item>
                    </Menu>
                </Sidebar>
                <Sidebar.Pusher>

                <div>
                    <main id="main" className="text-center">
                    <h2>Draggable Module Tool</h2>
                    <div id="screenshotarea" className = "row target-body">

                        <div className = "destination small-12">
                            <div className="module-added">
                                <div className="remove">
                                    <Button icon  >
                                        <Icon size="small" name="x" />
                                    </Button>
                                </div>
                                { this.props.headerSelection ?
                                    <div>
                                        <h5>{this.props.headerSelection.text}</h5>
                                        <Image src={this.props.headerSelection.url}/>
                                    </div> :
                                <h2>Header</h2>}
                            </div>
                        </div>

                        <div className = "destination small-12">
                            <div className="module-added">
                                <div className="remove">
                                    <Button icon  >
                                        <Icon size="small" name="x" />
                                    </Button>
                                </div>
                                { this.props.moduleSelection ?
                                    <div>
                                        <h5>{this.props.moduleSelection.text}</h5>
                                        <Image src={this.props.moduleSelection.url}/>
                                    </div> :
                                <h2>Module</h2>}
                            </div>
                        </div>

                        <div className = "destination small-12">
                            <div className="module-added">
                                <div className="remove">
                                    <Button icon floated >
                                        <Icon size="small" name="x" />
                                    </Button>
                                </div>
                                { this.props.footerSelection ?
                                    <div>
                                        <h5>{this.props.footerSelection.text}</h5>
                                        <Image src={this.props.footerSelection.url}/>
                                    </div> :
                                <h2>Footer</h2>}
                            </div>
                        </div>

                    </div>
                    </main>
                </div>

                </Sidebar.Pusher>
             </Sidebar.Pushable>
            </div>
        );
    }
}