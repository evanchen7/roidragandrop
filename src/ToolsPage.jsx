import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import Modules from './Modules';
import './css/main.css';

export default class ToolsPage extends Component {

    state = { visible: false }

    toggleVisibility = () => this.setState({ visible: !this.state.visible });
    removeNumbers = (item) =>  item.replace(/[0-9]/g, '');

    mapModules = () => {
        return {
            "H": {
                value: "Header",
                data: this.props.header,
                handleSelection: this.props.handleHeaderSelection
            },
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
            "M": {
                value: "Module",
                data: this.props.module,
                handleSelection: this.props.handleModuleSelection
            },
            "Footer": {
                value: "Footer",
                data: this.props.footer,
                handleSelection: this.props.handleFooterSelection
            },
            "F": {
                value: "Footer",
                data: this.props.footer,
                handleSelection: this.props.handleFooterSelection
            }
        }
    }

    generateDropdownModules = () => {
        const { initialModules } = this.props;
        const mapModuleNames = this.mapModules();

        return initialModules.map((mod, index) => {
            let convert = this.removeNumbers(mod[0]);
            return (
                <div key={mod[0]}>
                    <Modules
                      dropDown={this.props.dropDown}
                      data={mapModuleNames[convert].data}
                      moduleName={mod[0]}
                    />
                </div>
            )
        });
    }

    generateModuleFields = () => {
        const { initialModules } = this.props;

        if (!initialModules) {
            return (
                <div className = "destination small-12">>
                    <div className="module-added">
                      <h2>Press Tools to Begin</h2>
                    </div>
                </div>
            );
        }

        return initialModules.map((mod, index) => {
            let parseObj;
            let lastIndex = mod.length - 1;
            if (mod.length > 1) {
               parseObj = JSON.parse(mod[lastIndex])
            }
            return (
                <div key={mod[0]} className = "destination small-12">
                    <div className="module-added">
                            {
                                mod.length <= 1 ? <h2>{ mod[0] }</h2> :
                                <div>
                                  <h5>{ parseObj.text }</h5>
                                  <Image src={parseObj.url}/>
                                  <button
                                    value={mod[0]}
                                    onClick={this.props.handleDeleteModule}
                                    >Delete
                                  </button>
                                </div>


                            }
                    </div>
                </div>
            );
        });
    }

    render () {
        return (
            <div>
                <div id="menu">
                    <ul>
                    {
                        this.generateDropdownModules()
                    }
                    </ul>
                </div>
                <div>
                    <main id="main" className="text-center">
                        <h2>Draggable Module Tool</h2>
                            <div id="screenshotarea" className = "row target-body">
                                {
                                    this.props.initialModules.length === 0 ?
                                    <div className = "destination small-12">
                                    <div className="module-added">
                                        <h2>Press Menu to Begin</h2>
                                        </div>
                                    </div> : this.generateModuleFields()
                                }
                            </div>
                    </main>
                </div>
            </div>
        );
    }
}