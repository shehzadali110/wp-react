import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import axios from 'axios';
import Spinner from "../../../spinner/loader";
import clientConfig from '../../../../client-config';
import { PostsAvailable, PostsNotAvailable } from "./Post";

export default class LoadMore extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            posts: [],
            categories: [],
            tags: [],
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
        let wordPressSiteURL = clientConfig.appUrl,
            embed = `/?_embed&per_page=${this.state.per}&page=${this.state.page}`,
            postUrl = `${wordPressSiteURL + clientConfig.getPosts + embed}`,
            tagUrl = `${wordPressSiteURL + clientConfig.getTags}?per_page=20`;

        const requestOne = axios.get(postUrl);
        const requestTwo = axios.get(tagUrl);

        this.setState({ loading: true }, () => {

            axios.all([requestOne, requestTwo]).then(
                axios.spread((...responses) => {
                    const responseOne = responses[0];
                    const responseTwo = responses[1];
                    if (responseOne.data.length && responseTwo.data.length) {
                        this.setState({ loading: false, posts: responseOne.data, tags: responseTwo.data });
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
    };

    loadMore = () => {
        this.setState(
            prevState => ({
                per: prevState.per + 2
            }),
            this.loadPosts
        );
    };


    // Sorting = (data) => {

    //     data.sort(function IHaveAName(a, b) {
    //         return b.id < a.id ?  1 // if b should come earlier, push a to end
    //                 : b.id > a.id ? -1 // if b should come later, push a to begin
    //                 : 0;                   // a and b are equal
    //     });

    // };


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

        const { loading, posts, per, page, error } = this.state;

        return (
            <React.Fragment>
                <Row>
                    {error && <Col md={12}><div className="alert alert-danger mt-3" dangerouslySetInnerHTML={this.createMarkup(error)} /></Col>}
                    {posts.length ? (
                        <Col md={7} className="pr-0">
                            {posts.map((post, index) => (
                                <PostsAvailable
                                    key={post.id}
                                    index={index}
                                    id={post.id}
                                    date={post.date}
                                    title={post.title.rendered}
                                    media={post.featured_media}
                                    tags={this.getTagsName(post.tags)}
                                    img={post._embedded.sizes !== undefined ? post._embedded['wp:featuredmedia'][0].media_details.sizes["medium"].source_url : null}
                                    description={post.excerpt.rendered}
                                />
                            ))}
                        </Col>
                    ) : <PostsNotAvailable />}
                    {loading && <Col md={12}><Spinner /></Col>}
                </Row>
                <Row>
                    <Col md={12}>
                        <button onClick={this.loadMore}>Load More</button>
                        <h1>{per} posts in {page} page</h1>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}