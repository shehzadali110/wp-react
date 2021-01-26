import React, { Component } from 'react';
import { Row, Col} from 'react-bootstrap';

import axios from 'axios';
import Spinner from "../../../spinner/loader";
import clientConfig from '../../../../client-config';
import InfiniteScroll from "react-infinite-scroll-component";
import {PostsAvailable, PostsNotAvailable} from "./Post";

export default class infinitePosts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            posts: [],
            per: 3,
            page: 1,
            error: ''
        };
    }

    createMarkup = (data) => ({
        __html: data
    });

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts = () => {
        const wordPressSiteURL = clientConfig.appUrl + clientConfig.getImgPosts;
        this.setState({ loading: true }, () => {
            axios.get(`${wordPressSiteURL}&page=${this.state.page}&per_page=${this.state.per}`)
                .then(res => {
                    if (res.data.length) {
                        this.setState({ loading: false, posts: res.data, per: this.state.per + 1 });
                    } else {
                        this.setState({ loading: false, error: 'No Posts Found' });
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
    };


    render() {

        const { loading, posts, per, page, error } = this.state;

        return (
            <React.Fragment>
                <Row>

                    {error && <Col md={12}><div className="alert alert-danger mt-3" dangerouslySetInnerHTML={this.createMarkup(error)} /></Col>}

                    <InfiniteScroll
                        dataLength={posts.length}
                        next={this.loadPosts}
                        hasMore={true}
                        loader={<Spinner />}
                    >
                        {posts.length ? (
                            <Col md={7} className="pr-0">
                                <h1>{per} posts in {page} page</h1>
                                {posts.slice(0, per).map((post, index) => (
                                    <PostsAvailable 
                                        key={post.id}
                                        index={index}
                                        id={post.id}
                                        date={post.date}
                                        title={post.title.rendered} 
                                        media={post.featured_media}
                                        img={post._embedded['wp:featuredmedia'][0].media_details.sizes["medium"].source_url}
                                        description={post.excerpt.rendered}
                                    />
                                ))}
                            </Col>
                        ) : <PostsNotAvailable/> }

                    </InfiniteScroll>

                    {loading && <Spinner />}

                </Row>
            </React.Fragment>
        );
    }
}
