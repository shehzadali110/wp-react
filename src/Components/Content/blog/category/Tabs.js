import React, { Component } from 'react'
import { Tab, Nav, Dropdown, Container } from 'react-bootstrap'
import SingleArticle from "../posts/load-more";

import axios from 'axios';
import Loader from "../../../../Dist/Images/loader.gif";
import clientConfig from '../../../../client-config';

export default class TaBs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            categories: [],
            children: [],
            error: '',
            key: 'Blog'
        };
    }

    createMarkup = (data) => ({
        __html: data
    });

    componentDidMount() {
        const WordPressSiteURL = clientConfig.appUrl + clientConfig.getCategories;
        this.setState({ loading: true }, () => {
            axios.get(WordPressSiteURL).then(res => {
                if (res.data.length) {
                    this.setState({ loading: false, categories: res.data });
                } else {
                    this.setState({ loading: false, error: 'No Categories Found' });
                }
            }).catch(err => {
                if (err.data === undefined) {
                    this.setState({ loading: false, error: err.message });
                } else {
                    this.setState({ loading: false, error: err.response.data.message });
                }
            });
        });

        const oldLogError = console.error
        console.error = function (...args) {
            if (typeof args[0] !== 'string' || args[0].indexOf('is deprecated in StrictMode') === -1) {
                oldLogError.apply(console, args)
            }
        }
    }

    makeTree = list => {

        var map = {},
            roots = [],
            node,
            i;

        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i;
            list[i].child = [];
        }

        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node.parent !== "0" && list[map[node.parent]] !== undefined) {
                // if you have dangling branches check that map[node.parent] exists
                list[map[node.parent]].child.push(node);
            } else {
                roots.push(node);
            }
        }

        return roots;
    };

    // handleSelect = (key) => {
    //     console.log(key,';;',typeof key)
    //     if(key === '1') {
    //         console.log('ll', key)
    //     } else if(key === '2') {
    //       console.log('ll', key)
    //     } else if(key === '3') {
    //       console.log('ll', key)
    //     }
    // }

    render() {

        const { loading, categories, error, key } = this.state;
        const category = this.makeTree(categories);
        // console.log(category);

        return (
            <div className="tabs-area">
                {error && <div className="alert alert-danger" dangerouslySetInnerHTML={this.createMarkup(error)} />}
                <Tab.Container defaultActiveKey={key}>
                    {category.length ? (
                        <Container>
                            <Nav variant="tabs">
                                {category.map((cat, index) => {

                                    return cat.child.length === 0 ? (
                                        <Nav.Link key={index} eventKey={cat.name}>{cat.name}</Nav.Link>
                                    )
                                        : cat.child.length ? (
                                            <Nav.Link key={index} eventKey={cat.name}>{cat.name}
                                                <Dropdown>
                                                    <Dropdown.Toggle></Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {cat.child.map((sub, index) => (
                                                            <Dropdown.Item key={index} href={`#${sub.name}`}>{sub.name}</Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Nav.Link>
                                        )
                                            : null;

                                })}
                            </Nav>
                            <Tab.Content>
                                {category.map((cat, index) => (
                                    <Tab.Pane key={index} eventKey={cat.name}>
                                        <SingleArticle />
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </Container>
                    ) : ''}
                </Tab.Container>
                {loading && <img className="loader" src={Loader} alt="Loader" />}
            </div>
        )

    }
}

