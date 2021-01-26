import React, { Component } from 'react'
import { Accordion, Button } from 'react-bootstrap';
import CRForm from "./Form"
export default class Reply extends Component {
    render() {
        return (
            <Accordion>
                <div className="reply_group">
                    <div className="reply_header">
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Reply
                        </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                        <CRForm/>
                    </Accordion.Collapse>
                </div>
            </Accordion>
        )
    }
}
