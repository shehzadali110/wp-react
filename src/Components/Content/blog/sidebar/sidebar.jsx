import React, { Component } from 'react';
import axios from 'axios';
import Spinner from "../../../spinner/loader";
import clientConfig from '../../../../client-config';

export default class SideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            categories: [],
            tags: [],
            error: ''
        };
    }

    createMarkup = (data) => ({
        __html: data
    });

    componentDidMount() {
        let categoryUrl = clientConfig.appUrl + clientConfig.getCategories,
            tagUrl = clientConfig.appUrl + clientConfig.getTags;

        const requestOne = axios.get(categoryUrl);
        const requestTwo = axios.get(tagUrl);

        this.setState({ loading: true }, () => {

            axios.all([requestOne, requestTwo]).then(
                axios.spread((...responses) => {
                    const responseOne = responses[0];
                    const responseTwo = responses[1];
                    if (responseOne.data.length && responseTwo.data.length) {
                        this.setState({ loading: false, categories: responseOne.data, tags: responseTwo.data });
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

    render() {

        const { loading, categories, tags, error } = this.state;

        return (
            <React.Fragment>
                {error && <div className="alert alert-danger mt-3" dangerouslySetInnerHTML={this.createMarkup(error)} />}
                <div className="sidebar">
                    <div className="social-container">
                        <div className="count"><span>Follow Us</span></div>
                        <div className="social-btns">
                            <a className="btn facebook" href="#facebook">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a className="btn twitter" href="#twitter">
                                <i className="fab fa-twitter" />
                            </a>
                            <a className="btn google" href="#google">
                                <i className="fab fa-instagram" />
                            </a>
                            <a className="btn dribbble" href="#dribbble">
                                <i className="fab fa-linkedin-in" />
                            </a>
                            <a className="btn skype" href="#skype">
                                <i className="fab fa-skype" />
                            </a>
                        </div>
                    </div>
                    <div className="search-container">
                        <div className="count"><span>Search here</span></div>
                        <form className="searchSite" method="post">
                            <input className="gt-search form-control" placeholder="search..." type="search" />
                            <input className="btn-go" defaultValue="Go" type="button" />
                        </form>
                    </div>
                    <div className="tags-container">
                        {categories.length ? (
                            <React.Fragment>
                                <div className="count"><span>{categories.length} Tags</span></div>
                                <div className="tags-content">
                                    {categories.map((category, index) => (
                                        <span key={index}>{category.name}</span>
                                    ))}
                                </div>
                            </React.Fragment>
                        ) : null}
                    </div>
                    <div className="categories-container">
                        {tags.length ? (
                            <React.Fragment>
                                <div className="count"><span>{tags.length} Categories</span></div>
                                <div className="categories-content">
                                    {tags.map((tag, index) => (
                                        <span key={index}>{tag.name}</span>
                                    ))}
                                </div>
                            </React.Fragment>
                        ) : null}
                    </div>
                </div>
                {loading && <Spinner />}
            </React.Fragment>
        )
    }
}
