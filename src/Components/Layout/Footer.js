import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer id="footer-Section">
                <div className="footer-top-layout">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9 offset-md-1 d-flex ">
                                <div className="col-sm-4 pr-3">
                                    <div className="footer-col-item">
                                        <img src={require('../../Dist/Images/logo.png')} className="w-80" alt="" />
                                        <address>
                                            <p>7637 Laurel Dr. King Of Prussia, PA 19406</p>
                                            <p>Use this tool as test data for an automated system or find your next pen</p>
                                        </address>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="footer-col-item">
                                        <h4>Contact Us</h4>
                                        <div className="item-contact"> <a href="tel:630-885-9200"><span className="link-id">P</span>:<span>630-885-9200</span></a> <a href="tel:630-839.2006"><span className="link-id">F</span>:<span>630-839.2006</span></a> <a href="mailto:info@brandcatmedia.com"><span className="link-id">E</span>:<span>info@brandcatmedia.com</span></a> </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="footer-col-item">
                                        <h4>Newsletter</h4>
                                        <form className="signUpNewsletter" method="get">
                                            <input className="gt-email form-control" placeholder="You@youremail.com" type="text" />
                                            <input className="btn-go" defaultValue="Go" type="button" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom-layout">
                    <div className="copyright-tag">Copyright © 2017 company name. All Rights Reserved.</div>
                </div>
            </footer>
        )
    }
}
