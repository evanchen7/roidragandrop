import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import Modules from './Modules';
import './css/main.css';

export default class Main extends Component {
    render () {
        return (
            <div>
                <div id = "menu">
                <ul>
                <li>
                    <div >
                    <Modules
                        data={this.props.header}
                        moduleName={"Header"}
                        handleSelection={this.props.handleHeaderSelection}/>
                    </div>
                </li>
                <li>
                    <div >
                    <Modules
                        data={this.props.module}
                        moduleName={"Module"}
                        handleSelection={this.props.handleModuleSelection}/>
                    </div>
                    </li>
                    <li>
                    <div >
                        <Modules
                        data={this.props.footer}
                        moduleName={"Footer"}
                        handleSelection={this.props.handleFooterSelection}/>
                        </div>
                    </li>
                </ul>
                </div>

                <div>
                    <main id = "main" className="text-center">
                    <h2>Draggable Module Tool</h2>
                    <div id ="screenshotarea" className = "row target-body">
                        <div id = "header" className = "destination small-12">
                        {this.props.headerSelection ? <Image src={this.props.headerSelection.url}/>: <h2>Header</h2>}
                        </div>
                        <div id = "module" className = "destination small-12">
                        {this.props.moduleSelection ? <Image src={this.props.moduleSelection.url}/>: <h2>Module</h2>}
                        </div>
                        <div id = "footer" className= "destination small-12">
                        {this.props.footerSelection ? <Image src={this.props.footerSelection.url}/>: <h2>Footer</h2>}
                        </div>
                    </div>
                    </main>
                </div>
            </div>
        );
    }
}