import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import Spinner from "../../../spinner/loader";
import clientConfig from "../../../../client-config";
import { PostsAvailable, PostsNotAvailable } from "../posts/Post";

export default class post extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: [],
      tags: [],
      categories: [],
      searchTerm: "",
      error: "",
      page: 50
    };
    this.searchTerm = this.searchItems.bind(this);
  }

  createMarkup = (data) => ({
    __html: data
  });

  componentWillMount() {
    let wordPressSiteURL = clientConfig.appUrl,
      embed = '?per_page=' + this.state.page + '',
      userUrl = wordPressSiteURL + clientConfig.getUsers + embed,
      postUrl = wordPressSiteURL + clientConfig.getPosts + embed,
      tagUrl = wordPressSiteURL + clientConfig.getTags + embed,
      catoryUrl = wordPressSiteURL + clientConfig.getCategories + embed;

    const requestUser = axios.get(userUrl);
    const requestPost = axios.get(postUrl);
    const requestTag = axios.get(tagUrl);
    const requestCatory = axios.get(catoryUrl);

    this.setState({ loading: true }, () => {

      axios.all([requestUser, requestPost, requestTag, requestCatory]).then(
        axios.spread((...responses) => {

          const getUserResponse = responses[0];
          const getPostResponse = responses[1];
          const getTagResponse = responses[2];
          const getCatoryResponse = responses[3];

          if (getUserResponse.data.length && getPostResponse.data.length && getTagResponse.data.length && getCatoryResponse.data.length) {
            this.setState({
              loading: false, users: getUserResponse.data, posts: getPostResponse.data,
              tags: getTagResponse.data, categories: getCatoryResponse.data
            });
          } else {
            this.setState({ loading: false, error: 'No Posts Found' });
          }

        })
      ).catch(err => {
        if (err.data === undefined) {
          this.setState({ loading: false, error: err.message });
        } else {
          this.setState({ loading: false, error: err.response.data.message });
        }
      });

    });
  }

  searchItems = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  getAuthorName = (id) => {
    const author = this.state.users;
    var authorItems, postId = id;

    for (authorItems = 0; authorItems < author.length; authorItems++) {
      if (author[authorItems].id === postId) {
        return author[authorItems].name;
      }
    }

  };

  getCategoriesName = (id) => {
    const categories = this.state.categories;

    var categoryItems,
      postItems,
      postId = id,
      categoryName = [];

    for (postItems = 0; postItems < postId.length; postItems++) {
      for (categoryItems = 0; categoryItems < categories.length; categoryItems++) {
        if (postId[postItems] === categories[categoryItems].id) {
          categoryName.push(categories[categoryItems].name + ' ');
        }
      }
    }

    return categoryName;
  };

  getTagsName = (id) => {
    const tags = this.state.tags;

    var tagItems,
      postItems,
      postId = id,
      tagName = [];

    for (postItems = 0; postItems < postId.length; postItems++) {
      for (tagItems = 0; tagItems < tags.length; tagItems++) {
        if (postId[postItems] === tags[tagItems].id) {
          tagName.push(tags[tagItems].name + ' ');
        }
      }
    }

    return tagName;
  };

  render() {
    const { loading, posts, error } = this.state;
    // console.log(posts);

    return (
      <React.Fragment>
        <Container>
          <Row>
            {error && <Col md={12}><div className="alert alert-danger mt-3" dangerouslySetInnerHTML={this.createMarkup(error)} /></Col>}
            <Col md={12}>
              <InputGroup className="border-start border-end">
                <InputGroup.Prepend>
                  <Button variant="outline-secondary">Button</Button>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Search here"
                  aria-label="search here"
                  aria-describedby="basic-addon1"
                  className="search-box"
                  onKeyUp={(e) => this.searchTerm(e)}
                />
              </InputGroup>
            </Col>
            {posts.length ? (
              <Col md={12}>
                {posts.filter((post) => {
                  return (
                    post.title.rendered.toLowerCase().indexOf(this.state.searchTerm) > -1 ||
                    post.excerpt.rendered.toLowerCase().indexOf(this.state.searchTerm) > -1 
                  );
                }).map((post, index) => {
                  return (
                    <PostsAvailable
                      key={post.id}
                      index={index}
                      id={post.id}
                      date={post.date}
                      title={post.title.rendered}
                      author={this.getAuthorName(post.author)}
                      tags={this.getTagsName(post.tags)}
                      category={this.getCategoriesName(post.categories)}
                      media={post.featured_media}
                      description={post.excerpt.rendered}
                    />
                  );
                })}
              </Col>
            ) : <PostsNotAvailable />}
            {loading && <Col md={12}><Spinner /></Col>}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}


