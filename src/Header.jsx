import React, { Component } from 'react';
import { Header, Icon, Modal, Grid, Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import ModalForm from './ModalForm';
import './css/main.css';

export default class Headers extends Component {

  render() {
    return (
        <header>
            <div className="row align-justify">
                <div >
                    <Link to="/">
                      <img src = "img/logo.svg" className="logo" alt="logo"/>
                    </Link>
                </div>

                <div className="columns right">
                  <Link to="/finishedpages" className="button pill small">Pages</Link>
                  <a className="button pill small" onClick={this.props.handleOptionsSidebar}>Menu</a>
                    <a className="sign-out"><i className="fa fa-user-o"></i> Sign Out</a>
                </div>
            </div>
        </header>
    );
  }
}
