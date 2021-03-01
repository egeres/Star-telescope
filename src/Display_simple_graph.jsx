
// https://www.d3-graph-gallery.com/intro_d3js.html
// http://www.d3noob.org/2013/01/making-dashed-line-in-d3js.html
// https://observablehq.com/@d3/gallery
// https://observablehq.com/@d3/brushable-scatterplot

import React, { Component } from "react";
import * as d3 from "d3";
import { svg } from "d3";
import PropTypes from 'prop-types';

export default class Display_simple_graph extends Component
{
    constructor(props) {
        super(props);
        this.myself = React.createRef();
        this.margin = 0
        this.width  = 1000
        this.height = 1000
    }

    render() {
        // if (this.props.align === "R") {
        //     return <hr ref={this.myself} style={{ marginRight: "0px" }}></hr>;
        // } else if (this.props.align === "L") {
        //     return <hr ref={this.myself} style={{ marginLeft: "0px" }}></hr>;
        // } else {
        //     return <hr ref={this.myself} style={{}}></hr>;
        // }

        // return (<svg ref={this.myself} width={800} height={500}></svg>)
        // console.log(this.width)
        // console.log(this.height)
        return (<svg ref={this.myself} width={this.props.width+"px"} height={this.props.height+"px"}></svg>)
    }

    componentDidMount() {
        this.draw()
    }
    
    componentDidUpdate() { this.draw() }

    draw() {
        // anime({
        //     targets: this.myself.current,
        //     width: ["0%", "100%"],
        //     duration: 5000,
        //     easing: "easeOutQuint", // https://easings.net
        // });

        let svg = d3.select(this.myself.current);

        svg.selectAll("*").remove();

        svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width",  1000)
            .attr("height", 1000)
            .style("fill", "#0e0e0e");

        svg.append("line")
            .attr("x1", 0)
            .attr("y1", this.props.height - this.props.margin)
            .attr("x2", 1000)
            .attr("y2", this.props.height - this.props.margin)
            .style("stroke-dasharray", ("3, 3"))
            .style("stroke", "#343434");

        svg.append("line")
            .attr("x1", 0)
            .attr("y1", this.props.margin)
            .attr("x2", 1000)
            .attr("y2", this.props.margin)
            .style("stroke-dasharray", ("3, 3"))
            .style("stroke", "#343434");

        if (this.props.data.length)
        {

            // console.log( this.props.data.map(input => input.x) )

            let x_max = Math.max(...this.props.data.map(input => input.x));
            let y_max = Math.max(...this.props.data.map(input => input.y));

            // console.log(x_max)
            // console.log(y_max)ç

            // console.log(this.width)
            // console.log(this.height)

            // let x = this.props.margin +                     d3.scaleLinear().domain([0, x_max]).range([0, this.props.width  - 2*this.props.margin]);
            // let y = this.props.margin + this.props.height - d3.scaleLinear().domain([0, y_max]).range([0, this.props.height - 2*this.props.margin]);
            let x = d3.scaleLinear().domain([0, x_max]).range([this.props.margin, this.props.width  - this.props.margin]);
            let y = d3.scaleLinear().domain([0, y_max]).range([this.props.margin, this.props.height - this.props.margin]);

            // svg.append("circle")
            //     .attr("cx", x(10))
            //     .attr("cy", 100)
            //     .attr("r", 40)
            //     .style("fill", "blue");




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
}

Display_simple_graph.propTypes = {
    // message: PropTypes.string,
    // onClick: PropTypes.func
    width : PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.number,
    data  : PropTypes.array,
};

Display_simple_graph.defaultProps = {
    // message: 'Hello',
    // onClick: function(){ alert("Hello"); }
    width : 1000,
    height: 1000,
    margin: 10,
    data  : [],
};
