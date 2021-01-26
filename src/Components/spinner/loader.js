import React, { Component } from 'react'

export default class loader extends Component {
    render() {
        return (
            <img className="loader" src={require('../../Dist/Images/loader.gif')} alt="Loader" />
        )
    }
}
