import React, { Component } from "react";
import clientConfig from "../../../../client-config";

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      Success: false,
      Submited: false,
      Failed: false,
      error: "",
    };
  }

  createMarkup = (data) => ({
    __html: data,
  });

  handleSubmit(evt) {
    evt.preventDefault();

    const getPostsUrl = clientConfig.appUrl + clientConfig.getComment;
    const [post_Id, name, email, comment] = evt.target.elements;

    const sendData = JSON.stringify({
      post: post_Id.value,
      author_name: name.value,
      author_email: email.value,
      content: comment.value,
    });

    fetch(getPostsUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: sendData,
    })
      .then((response) => {
        if (response.ok === true) {
          this.setState({
            Submited: false,
            Success: true,
            comments: "",
          });
        }

        return response.json();
      })
      .then((object) => {
        this.setState({
          Submited: false,
          Failed: true,
          error: object.message,
        });
      })
      .catch((er) => {
        console.error("Error:", er);
      });
  }

  render() {
    const { comments, Success, Submited, Failed, error } = this.state;

    const submitButtonMarkup = Submited ? (
      <input
        type="submit"
        className="btn-submit-stop"
        value="Submitting comment..."
        disabled
      />
    ) : (
      <input type="submit" className="btn-submit" value="Post comment!" />
    );

    const successMessageMarkup = Success ? (
      <div class="alert alert-success">
        Thanks for your comment! It will appear once approved.
      </div>
    ) : null;

    const errorMessageMarkup =
      Failed && Success === false ? (
        <div
          className="alert alert-danger"
          dangerouslySetInnerHTML={this.createMarkup(error)}
        />
      ) : null;

    return (
      <React.Fragment>
        <form id="company__settings" onSubmit={this.handleSubmit.bind(this)}>
          {successMessageMarkup}
          {errorMessageMarkup}
          <input type="hidden" id="post_Id" value={this.props.id} />
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Name*</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                disabled={Submited}
              />
              <span className="input-feedback" data-id="name" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                disabled={Submited}
              />
              <span className="input-feedback" data-id="email" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="comment">Comment*</label>
              <textarea
                rows="4"
                className="form-control"
                id="comment"
                required
                disabled={Submited}
                onChange={(evt) => {
                  this.setState({ comments: evt.target.value });
                }}
                value={comments}
              />
              <span className="input-feedback" data-id="comment" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <p className="comment-form-cookies-consent mb-0">
                <input
                  id="wp-comment-cookies-consent"
                  name="wp-comment-cookies-consent"
                  type="checkbox"
                  value="yes"
                />
                <label htmlFor="wp-comment-cookies-consent">
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </label>
              </p>
              <span
                className="input-feedback"
                data-id="wp-comment-cookies-consent"
              />
            </div>
            <div className="form-group col-md-3">
              {submitButtonMarkup}
              <span className="input-feedback" data-id="SubMit" />
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
