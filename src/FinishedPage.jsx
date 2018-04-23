import React, { Component } from 'react';
import _ from 'lodash';
import './css/finishedpage.css';
import WPAPI from 'wpapi';

// const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

// const DEVELOPMENTURL =`${apiUrl}/wp-json`;
const wp = new WPAPI({
  endpoint: 'http://54.183.106.255:8000/wp-json',
  username: 'evan@roidna.com',
  password: 'Gvpix5597!Gvpix5597!',
  auth: true
});

wp.finishedPage = wp.registerRoute('wp/v2', '/finished_page',
{ params: [ 'before', 'after', 'author', 'parent', 'post', 'posts' ] });


export default class FinishedPage extends Component {
    state = {
      pages: null,
      perPage: 5,
      pageNumber: 1
    }

  // link pageNumber to state
  // link perPage to state
  grabFinishedPages = () => {
    const { perPage, pageNumber } = this.state;
    wp.finishedPage().posts().perPage(perPage).page(pageNumber)
      .then(res => this.setState({ pages: res}))
  }

  removePTags = (content) => {
    return content.replace(/<\/?p[^>]*>/g, "");
  }

  formatPages = () => {
    const pages = this.state.pages;
    if (!pages) return <h1>Use Semantic Loading...</h1>

    return pages.map((page, index) => {
        const pageContent = this.removePTags(page.content.rendered);
      return (
              <div key={page.id}>
                <br/>
                <div >
                  {
                    pageContent
                  }
                </div>
              </div>
      );
    });
  }

  componentDidMount() {
    this.grabFinishedPages()
  }

  render () {
    return (
        <div>
          <h1>Page is under development</h1>
          {this.formatPages()}
        </div>
    );
  }
}