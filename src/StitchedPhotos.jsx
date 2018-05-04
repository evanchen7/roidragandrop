import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import './css/finishedpage.css';
import WPAPI from 'wpapi';

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
const DEVELOPMENTURL =`${apiUrl}/wp-json`;
const USER = process.env.REACT_APP_USERNAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;

const wp = new WPAPI({
  endpoint: DEVELOPMENTURL,
  username: USER,
  password: PASSWORD,
  auth: true
});

wp.stitchedPhotos = wp.registerRoute('wp/v2', '/stitched_photo',
{ params: [ 'before', 'after', 'author', 'parent', 'post', 'posts' ] });


export default class StitchedPhotos extends Component {
    state = {
      pages: null,
      perPage: 100,
      pageNumber: 1
    }

  grabFinishedPages = () => {
    const { perPage, pageNumber } = this.state;
    wp.stitchedPhotos().posts().perPage(perPage).page(pageNumber)
      .then(res => this.setState({ pages: res}))
  }

  formatCards = () => {
    const pages = this.state.pages;
    if (!pages) return <h1>Use Semantic Loading...</h1>

    console.log(pages)

    return pages.map((page, index) => {
      const { stitched_photo, author_name, project_title } = page.acf
      return (
        <Card raised key={index}>
          <Image src={stitched_photo.url}/>
          <Card.Header>{project_title}</Card.Header>
          <Card.Meta>{`Created on ${stitched_photo.date}`}</Card.Meta>
          <Card.Description>{author_name}</Card.Description>
        </Card>
      );
    });
  }

  componentDidMount() {
    this.grabFinishedPages()
  }

  render () {
    return (
        <div>
          {
            !this.state.pages ? <h1>No Pages Saved</h1> :
          <Card.Group itemsPerRow={4}>
            {this.formatCards()}
          </Card.Group>

          }
        </div>
    );
  }
}