import React, { Component } from 'react';
import { Icon, Button, Image, Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";

export default class NewHeader extends Component {

  render() {
    return (
        <div>
            <Menu inverted={true}>
                <Menu.Item as='a' header href='https://www.roidna.com'
                    target='_blank'>
                <Image
                    size='tiny'
                    src='img/logo.svg'
                    style={{ marginRight: '1.5em' }}
                />
                </Menu.Item>
                <Menu.Item name='home'>
                    <Link to="/">
                        <Icon name='home' />
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item name="pages">
                    <Link to="/finishedpages">
                        <Icon name='content' />
                         Pages
                    </Link>
                </Menu.Item>

                <Menu.Menu position='right'>
                   <Menu.Item onClick={this.props.handleSideBarMenu}>
                       <Icon name='cogs'/>
                        Menu
                   </Menu.Item>
                    <Menu.Item>
                        <Button color='grey'>
                            <Icon name='sign out'/>
                             Sign Out
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    );
  }
}
