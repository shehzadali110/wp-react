import React, { Component } from 'react';

import axios from 'axios';
import Loader from "../../../../Dist/Images/loader.gif";
import renderHTML from 'react-render-html';
import Moment from 'react-moment';
import clientConfig from '../../../../client-config';

import { Container, Row, Col } from 'react-bootstrap';
import CForm from "../forms/Form";
import CDisplay from "../forms/Comments"
import Sidebar from "../sidebar/sidebar";

export default class Detail extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			post: {},
			error: ''
		};
	}

	createMarkup = (data) => ({
		__html: data
	});

	componentDidMount() {
		const wordPressSiteURL = clientConfig.appUrl + clientConfig.getPosts + "/" + this.props.id;
		this.setState({ loading: true }, () => {
			axios.get(wordPressSiteURL)
				.then(res => {
					if (Object.keys(res.data).length) {
						this.setState({ loading: false, post: res.data });
					} else {
						this.setState({ loading: false, error: 'No Posts Detail Found' });
					}
				})
				.catch(err => {
					if (err.data === undefined) {
						this.setState({ loading: false, error: err.message });
					} else {
						this.setState({ loading: false, error: err.response.data.message });
					}
				});
		});
	}

	componentWillUnmount() {
		this.setState = () => {
			return;
		};
	}

	render() {

		const { loading, post, error } = this.state;
		//console.log(post);

		return (
			<React.Fragment>
				{error && <div className="alert alert-danger" dangerouslySetInnerHTML={this.createMarkup(error)} />}
				{Object.keys(post).length ? (
					<div className="posts-container">
						<Container>
							<Row>
								<Col md={8} className="pr-0">
									<article key={post.id} id={`article-detail-${post.id}`} className="article-detail">
										<header className="entry-header">
											<h2 className="entry-title pl-4 pr-4 pt-5 mb-3">
												{renderHTML(post.title.rendered)}
											</h2>
											<div className="d-flex pl-4 pr-4">
												<span className="entry-author mr-4">By admin</span>
												<span className="entry-time"><Moment fromNow >{post.date}</Moment></span>
											</div>
										</header>
										<div className="post-inner">
											<div className="entry-content pl-4 pr-4">
												{renderHTML(post.content.rendered)}
											</div>
										</div>
										<div className="Post-comments">
											<CDisplay id={post.id} />
										</div>
										<div className="card-footer">
											<CForm id={post.id} />
										</div>
									</article>
								</Col>
								<Col md={4} className="pl-0">
									<Sidebar />
								</Col>
							</Row>
						</Container>
					</div>
				) : ''}
				{loading && <img className="loader" src={Loader} alt="Loader" />}
			</React.Fragment>
		)
	}
}
