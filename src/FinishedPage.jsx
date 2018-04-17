import React, { Component } from 'react';
import './css/finishedpage.css';
import WPAPI from 'wpapi';

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

const DEVELOPMENTURL =`${apiUrl}/wp-json`;
const wp = new WPAPI({
  endpoint: DEVELOPMENTURL,
  username: 'evan@roidna.com',
  password: 'Gvpix5597!Gvpix5597!',
  auth: true
});
wp.finishedPage = wp.registerRoute('wp/v2', '/finished_page');

export default class FinishedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  grabFinishedPages = () => {

  }

  componentDidMount() {
    this.grabFinishedPages();
  }

  render () {
    return (
      <div className="container">
        <h1>
          Finished Page
        </h1>
      </div>
    );
  }
}