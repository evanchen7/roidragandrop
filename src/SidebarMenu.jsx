import React, { Component } from 'react'
import { Confirm, Menu, Icon } from 'semantic-ui-react'

export default class SidebarMenu extends Component {
  state = { open: false }

  show = () => this.setState({ open: true });
  handleConfirm = () => this.setState({ open: false });
  handleCancel = () => this.setState({ open: false });

  render() {
    return (
      <div>
           <Menu floated="right"  compact="true" size="mini">
                <Menu.Item name='Header' onClick={() => this.props.handleAddModules("Header")}>
                <Icon name='arrow down' />
                    Header
                </Menu.Item>
                <Menu.Item name='Header' onClick={() => this.props.handleAddModules("unshift Header")}>
                <Icon name='arrow up' />
                    Header
                </Menu.Item>
                <Menu.Item name='Module' onClick={() => this.props.handleAddModules("Module")}>
                <Icon name='arrow up' />
                    Module
                </Menu.Item>
                <Menu.Item name='Module' onClick={() => this.props.handleAddModules("unshift Module")}>
                <Icon name='arrow down' />
                    Module
                </Menu.Item>
                <Menu.Item name='Footer' onClick={() => this.props.handleAddModules("Footer")}>
                <Icon name='arrow up' />
                    Footer
                </Menu.Item>
                <Menu.Item name='Footer' onClick={() => this.props.handleAddModules("unshift Footer")}>
                <Icon name='arrow down' />
                    Footer
                </Menu.Item>
                <Menu.Item name='Reset' onClick={this.show} >
                <Icon name='refresh' />
                    Reset
                </Menu.Item>
            </Menu>
            <Confirm
            open={this.state.open}
            onConfirm={ () => { this.props.resetModules();  this.handleCancel()} }
            onCancel={this.handleCancel}
            />
      </div>
    )
  }
}