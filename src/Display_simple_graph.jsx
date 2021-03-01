
// https://www.d3-graph-gallery.com/intro_d3js.html
// http://www.d3noob.org/2013/01/making-dashed-line-in-d3js.html
// https://observablehq.com/@d3/gallery
// https://observablehq.com/@d3/brushable-scatterplot

import React, { Component } from "react";
import * as d3 from "d3";
import { svg } from "d3";

export default class Display_simple_graph extends Component
{
    constructor(props) {
        super(props);
        this.myself = React.createRef();
    }

    render() {
        // if (this.props.align === "R") {
        //     return <hr ref={this.myself} style={{ marginRight: "0px" }}></hr>;
        // } else if (this.props.align === "L") {
        //     return <hr ref={this.myself} style={{ marginLeft: "0px" }}></hr>;
        // } else {
        //     return <hr ref={this.myself} style={{}}></hr>;
        // }

        return (<svg ref={this.myself} width={800} height={500}></svg>)
    }

    // componentDidMount() {
    componentDidUpdate() {
        // anime({
        //     targets: this.myself.current,
        //     width: ["0%", "100%"],
        //     duration: 5000,
        //     easing: "easeOutQuint", // https://easings.net
        // });

        let svg = d3.select(this.myself.current);

        svg.selectAll("*").remove();

        let x   = d3.scaleLinear().domain([0, 100]).range([0, 800]);
        let y   = d3.scaleLinear().domain([0, 100]).range([0, 500]);

        // svg.append("circle")
        //     .attr("cx", x(10))
        //     .attr("cy", 100)
        //     .attr("r", 40)
        //     .style("fill", "blue");

        svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width",  1000)
            .attr("height", 1000)
            .style("fill", "#0e0e0e");

        svg.append("line")
            .attr("x1", 0)
            .attr("y1", 300)
            .attr("x2", 1000)
            .attr("y2", 300)
            .style("stroke-dasharray", ("3, 3"))
            .style("stroke", "#343434");
        
        // var data = [ {x:10, y:20}, {x:40, y:90}, {x:80, y:50} ]

        svg.selectAll("whatever")
            .data(this.props.data)
            .enter()
            .append("circle")
                .attr("cx", function(d){ return x(d.x) })
                .attr("cy", function(d){ return y(d.y) })
                .attr("r", 3)
                .style("fill", "#8c8c8c");

    }
}

