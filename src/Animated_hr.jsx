
import React, { Component } from "react";
import anime from "animejs/lib/anime.es.js";

export default class Animated_bar extends Component {
    constructor(props) {
        super(props);
        this.myself = React.createRef();
    }

    render() {
        if (this.props.align === "R") {
            return <hr ref={this.myself} style={{ marginRight: "0px" }}></hr>;
        } else if (this.props.align === "L") {
            return <hr ref={this.myself} style={{ marginLeft: "0px" }}></hr>;
        } else {
            return <hr ref={this.myself} style={{}}></hr>;
        }
    }

    componentDidMount() {
        anime({
            targets: this.myself.current,
            width: ["0%", "100%"],
            duration: 5000,
            easing: "easeOutQuint", // https://easings.net
        });
    }
}
