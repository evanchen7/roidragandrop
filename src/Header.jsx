import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './css/main.css';

export default class Headers extends Component {

  render() {
    return (
        <header>
            <div className="row align-justify">
                <div >
                    <Link to="/">
                      <img src = "./img/logo.svg" className="logo" alt="logo"/>
                    </Link>
                </div>

                <div className="columns right">
                  <Link to="/finishedpages" style={{"display":"none"}} className="button pill small">Pages</Link>
                  <a className="button pill small" onClick={this.props.handleSideBarMenu}>Save</a>
                    <a className="sign-out"><i className="fa fa-user-o"></i> Sign Out</a>
                </div>
            </div>
        </header>
    );
  }
}
