import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "@reach/router";
import renderHTML from "react-render-html";
// import Moment from "react-moment";

class PostsAvailable extends Component {
  render() {
    return (
      <React.Fragment>
        <article className={`article-${this.props.id}`}>
          <header className="entry-header">
              {/* <Moment fromNow>{this.props.date}</Moment> */}
              <h4 className="entry-sub-title mb-0">
                <span>Author: {this.props.author}</span>
              </h4>
            {this.props.tags.length > 0 ? (
              <h4 className="entry-sub-title mb-0 pt-0">
                <span>Tags: {this.props.tags}</span>
              </h4>
            ) : null}
            {this.props.category.length > 0 ? (
              <h4 className="entry-sub-title mb-0 pt-0">
                <span>Categories: {this.props.category}</span>
              </h4>
            ) : null}
            <h2 className="entry-title pl-4 pr-4 mb-3">
              <Link to={`/${this.props.title}/${this.props.id}`}>
                {renderHTML(this.props.title)}
              </Link>
            </h2>
          </header>
          <figure className="featured-media">
            {this.props.media && this.props.img ? (
              <Link to={`/${this.props.title}/${this.props.id}`}>
                <Card.Img src={this.props.img} />
              </Link>
            ) : null}
          </figure>
          <div className="post-inner">
            <div className="entry-content pl-4 pr-4">
              {renderHTML(this.props.description)}
              <Link to={`/${this.props.title}/${this.props.id}`} className="btn">
                Read More...
              </Link>
            </div>
          </div>
        </article>
      </React.Fragment>
    );
  }
}

class PostsNotAvailable extends Component {
  render() {
    return (
      <React.Fragment>
        <article>
          <header className="entry-header">
            <h2 className="entry-title pl-4 pr-4 mb-3">
              Sorry, this content isn't available right now
            </h2>
          </header>
          <div className="post-inner">
            <div className="entry-content pl-4 pr-4">
              this link you followed may have expired or the page may 404 error
              <Link to="/" className="btn">Go to the previous page</Link>
            </div>
          </div>
        </article>
      </React.Fragment>
    );
  }
}

export { PostsAvailable, PostsNotAvailable };
