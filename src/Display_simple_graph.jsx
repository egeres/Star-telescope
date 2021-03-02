
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

    render()
    {
        return (<svg ref={this.myself} width={this.props.width+"px"} height={this.props.height+"px"}></svg>)
    }

    componentDidMount()
    {
        this.draw()
    }
    
    componentDidUpdate()
    {
        this.draw()
    }

    draw()
    {
        let svg     = d3.select(this.myself.current);
        let tooltip = d3.select("#Tooltip")

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

        svg.append("line")
            .attr("x1", this.props.margin)
            .attr("y1", 0)
            .attr("x2", this.props.margin)
            .attr("y2", this.props.height)
            .style("stroke-dasharray", ("3, 3"))
            .style("stroke", "#343434");

        svg.append("line")
            .attr("x1", this.props.width - this.props.margin)
            .attr("y1", 0)
            .attr("x2", this.props.width - this.props.margin)
            .attr("y2", this.props.height)
            .style("stroke-dasharray", ("3, 3"))
            .style("stroke", "#343434");


        if (this.props.data.length)
        {
            // console.log(this.props.data)

            let x_max = Math.max(...this.props.data.map(input => input.x));
            let y_max = Math.max(...this.props.data.map(input => input.y));

            let x = d3.scaleLinear().domain([0, x_max]).range([this.props.margin, this.props.width  - this.props.margin]);
            let y = d3.scaleLinear().domain([0, y_max]).range([this.props.height - this.props.margin, this.props.margin]);

            // let data = [ {x:10, y:20}, {x:40, y:90}, {x:80, y:50} ]
            
            let y_axis = [0, 0.25, 0.5, 0.75, 1];

            svg.selectAll("Lol")
                .data(y_axis.map(x => x*y_max))
                .enter()
                .append("text")
                    .attr("x", 25)             
                    .attr("y", (d) => y(d))
                    .attr("text-anchor", "middle")  
                    .style("font-size", "16px") 
                    // .style("text-decoration", "underline") 
                    .attr("fill", "white")
                    .text(d => d);

            svg.selectAll("Lol")
                .data(y_axis.map(x => x*x_max))
                .enter()
                .append("text")
                    .attr("x", (d) => x(d))
                    .attr("y", this.props.height - 10)             
                    .attr("text-anchor", "middle")  
                    .style("font-size", "16px") 
                    // .style("text-decoration", "underline") 
                    .attr("fill", "white")
                    .text(d => d);
    
            svg.selectAll("whatever")
                .data(this.props.data)
                .enter()
                .append("circle")
                    .attr("cx", function(d){ return x(d.x) })
                    .attr("cy", function(d){ return y(d.y) })
                    .attr("r", 10)
                    .attr('opacity', 0.3)
                    .style("fill", "#8c8c8c")

                    .on("mouseover", function(d) {
                        // console.log(d)
                        tooltip.transition()		
                            .duration(200)		
                            .style("opacity", .9);		
                        tooltip
                            .html(d + "<br/>")	
                            .style("left", (d.clientX) + "px")		
                            .style("top",  (d.clientY - 28) + "px");	

                        d3.select(this).style("opacity", 1)
                    })					
                    .on("mouseout", function(d) {		
                        tooltip.transition()		
                            .duration(500)		
                            .style("opacity", 0);	
                        d3.select(this).style("opacity", 0.3)
                    })
        }

    }
}

Display_simple_graph.propTypes = {
    width : PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.number,
    data  : PropTypes.array,
};

Display_simple_graph.defaultProps = {
    width : 1000,
    height: 1000,
    margin: 10,
    data  : [],
};
