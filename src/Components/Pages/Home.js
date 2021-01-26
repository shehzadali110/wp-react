import React, { Component } from 'react';
import { Router } from "@reach/router";

import NavBar from "../Layout/Navs";
import Footerr from "../Layout/Footer"
import TaB from "../Content/blog/category/Tabs";
import PostDetail from "../Content/blog/posts/Detail";
import Result from "../Content/blog/search/result";

export default class Home extends Component {

    render() {
        return (
            <div className="wrapper">
                <NavBar />
                    <Router>
                        <TaB path="/" />
                        <PostDetail path="/:name/:id" />
                        <Result path="/result" />
                    </Router>
                <Footerr />
            </div>
        )
    }
}