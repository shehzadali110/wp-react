import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import Loader from "../../../../Dist/Images/loader.gif";
import clientConfig from "../../../../client-config";
import CReply from "./Reply";
import Message from "./message";

export default class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      comments: [],
      error: "",
    };
  }

  createMarkup = (data) => ({
    __html: data,
  });

  componentDidMount() {
    const WordPressSiteURL =
      clientConfig.appUrl + clientConfig.getComment + "?post=" + this.props.id;
    this.setState({ loading: true }, () => {
      axios
        .get(WordPressSiteURL)
        .then((res) => {
          if (res.data.length) {
            this.setState({ loading: false, comments: res.data });
          } else {
            this.setState({
              loading: false,
              error: "No comments on this post",
            });
          }
        })
        .catch((err) => {
          if (err.data === undefined) {
            this.setState({ loading: false, error: err.message });
          } else {
            this.setState({ loading: false, error: err.response.data.message });
          }
        });
    });
  }

  render() {
    const { loading, comments, error } = this.state;
    const regex = /(<([^>]+)>)/gi;
    //console.warn(comments);

    return (
      <div className="author-area">
        <div className="comment-count">
          <span>{comments.length} Comment</span>
        </div>
        {error && (
          <Container>
            <div
              className="alert alert-warning"
              dangerouslySetInnerHTML={this.createMarkup(error)}
            />
          </Container>
        )}
        {comments.length ? (
          <Container>
            {comments.map((display) => (
              <div className="comment_group" id={display.id} key={display.id}>
                <Row>
                  <Col md={2} className="pr-0">
                    <figure className="author-media">
                      {display.Author_avatar_urls ? (
                        <Card.Img
                          src={display.Author_avatar_urls[0].source_url}
                        />
                      ) : (
                        <Card.Img
                          src={require("../../../../Dist/Images/picture-not-available.jpg")}
                        />
                      )}
                    </figure>
                  </Col>
                  <Col md={10} className="pl-0 pr-5">
                    <div className="header">
                      <h4>
                        {display.author_name}
                        <span>{display.status}</span>
                      </h4>
                      <h6>{display.date}</h6>
                    </div>
                    <div className="body">
                      <Message
                        text={display.content.rendered.replace(regex, "")}
                        maxLength={100}
                      />
                    </div>
                    <div className="footer">
                      <CReply />
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </Container>
        ) : (
          ""
        )}
        {loading && <img className="loader" src={Loader} alt="Loader" />}
      </div>
    );
  }
}
