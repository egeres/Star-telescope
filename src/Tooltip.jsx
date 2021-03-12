
import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class Tooltip extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render()
    {
        return (<div
        style={{
            position       : "absolute",
            padding        : "10px",
            backgroundColor: "#313131",
            left           : 200,
            top            : 200,
            opacity        : 0,
            // width         : "100%",
            // display       : "flex",
            // flexGrow      : 1,
            // justifyContent: "center",
            // flexDirection : "row",
        }} id="Tooltip">

            {this.props.content_text}
        </div>)
    }

    componentDidMount()
    {

    }
}

Tooltip.propTypes = {
    content_text : PropTypes.string,
};

Tooltip.defaultProps = {
    content_text : "-",
};