
// https://www.d3-graph-gallery.com/intro_d3js.html
// http://www.d3noob.org/2013/01/making-dashed-line-in-d3js.html
// https://observablehq.com/@d3/gallery
// https://observablehq.com/@d3/brushable-scatterplot

// https://www.d3-graph-gallery.com/graph/circularpacking_template.html

// https://www.d3indepth.com/force-layout/

// https://bl.ocks.org/steveharoz/8c3e2524079a8c440df60c1ab72b5d03

import React, { Component } from "react";
import * as d3 from "d3";
import { svg } from "d3";
import PropTypes from 'prop-types';

export default class Display_bubble_graph extends Component
{
    constructor(props) {
        super(props);
        this.myself = React.createRef();
        this.margin = 0
        this.width  = 1000
        this.height = 1000
        this.dataaa   = [{radius:20}]
    }

    render()
    {
        return (<svg ref={this.myself} width={this.props.width+"px"} height={this.props.height+"px"}></svg>)
    }

    componentDidMount()
    {
        console.log(this.props.data)
        this.dataaa = [{radius:20}]
        this.draw()
    }
    
    componentDidUpdate()
    {
        // this.draw()
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


        // if (this.props.data.length)
        if (false)
        {
            // console.log(this.props.data)

            // let x_max = Math.max(...this.props.data.map(input => input.x));
            // let y_max = Math.max(...this.props.data.map(input => input.y));

            // let x = d3.scaleLinear().domain([0, x_max]).range([this.props.margin, this.props.width  - this.props.margin]);
            // let y = d3.scaleLinear().domain([0, y_max]).range([this.props.height - this.props.margin, this.props.margin]);

              // What happens when a circle is dragged?
            function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(.03).restart();
                d.fx = d.x;
                d.fy = d.y;
            }
            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }
            function dragended(d) {
                if (!d3.event.active) simulation.alphaTarget(.03);
                d.fx = null;
                d.fy = null;
            }

            var node = svg.append("g")
                .selectAll("circle")
                .data(this.props.data)
                .enter()
                .append("circle")
                .attr("class", "node")
                .attr("r", function(d) {return d.density})
                // .attr("r", function(d){ return size(d.value)})
                // .attr("r", function(d){ return size(d.density)})
                .attr("cx", this.props.width  / 2)
                .attr("cy", this.props.height / 2)
                // .style("fill", function(d){ return color(d.region)})
                .style("fill", "red")
                // .style("fill-opacity", 0.8)
                .attr("stroke", "black")
                .style("stroke-width", 1)
                .call(d3.drag() // call specific function when circle is dragged
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));


                
            // Features of the forces applied to the nodes:
            var simulation = d3.forceSimulation()
                .force("center" , d3.forceCenter().x(this.props.width / 2).y(this.props.height / 2)) // Attraction to the center of the svg area
                .force("charge" , d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
                // .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.value)+3) }).iterations(1)) // Force that avoids circle overlapping
                .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return d.value+3 }).iterations(1)) // Force that avoids circle overlapping

            simulation
                .nodes(this.props.data)
                .on("tick", function(d){
                  node
                      .attr("cx", function(d){ return d.x; })
                      .attr("cy", function(d){ return d.y; })
                });

        }

        // if (this.props.data.length && true)
        if (true)
        {
            // var width = 300, height = 300
            var nodes = [
                {radius:20},
                {radius:20},
                {radius:50},
                {radius:100},
                {radius:20},
                {radius:20},
                {radius:20}
            ]

            // this.data = nodes
            nodes = [
                {radius:20},
                {radius:20},
            ]

            nodes = [...this.props.data]

            // var simulation = d3.forceSimulation(nodes)
            //     .force('charge', d3.forceManyBody().strength(0).distanceMin(0).distanceMax(10)  )
            //     .force('center', d3.forceCenter(this.props.width / 2, this.props.height / 2))
            //     // .force('center', d3.forceCenter(100, 100))
            //     // .force('collision', d3.forceCollide().radius(function(d) {
            //     //     return d.radius
            //     //   }))
            //     //   .force('x', d3.forceX().x(function(d) {
            //     //     return xCenter[d.category];
            //     //   }))
            //     .on('tick', ticked)

            var attractForce = d3.forceManyBody().strength(90) //.distanceMax(400).distanceMin(60);
            var repelForce   = d3.forceManyBody().strength(-140).distanceMax(50).distanceMin(10);
            // var forcecollide = d3.forceCollide().radius(10)
            var forcecollide = d3.forceCollide().radius(function(d) { return d.radius })

            var simulation   = d3.forceSimulation(nodes)
            // var simulation   = d3.forceSimulation(this.props.data)
            // var simulation   = d3.forceSimulation(this.dataaa)

            
                .force('center',    d3.forceCenter(this.props.width / 2, this.props.height / 2))
                // .alphaDecay(0.03)
                .force("attractForce",attractForce)
                // .force("repelForce",  repelForce)
                // .force('collision', d3.forceCollide().radius(function(d) { return d.radius }))
                .force("collision",forcecollide)
                .on('tick', ticked);

            function ticked() {

                // var u = d3.select('svg')
                // var u = d3.select(this.myself.current)
                var u = svg
                    .selectAll('circle')
                    .data(nodes)
                    // .data(this.props.data)
                    // .data(this.dataaa)

                    // this.props.data
                // var elemEnter = u.enter()
                //     .append("g")
                //     // .attr("transform", function(d){return "translate("+d.x+",80)"})
                //     .attr("transform", function(d){return "translate(10,10)"})
 

                u.enter()
                    .append('circle')
                    // .attr('r', 20)
                    // .attr('r',  function(d) {return Math.random() * 50 + 5})
                    .attr('r',  function(d) {return d.radius})
                    .style("fill", "#e62424")
                    .style("stroke", "gray")
                    .style("stroke-width", 3)
                    .merge(u)
                    .attr('cx', function(d) {return d.x})
                    .attr('cy', function(d) {return d.y})

                    // svg.selectAll('circle')
                    // u.enter()
                    // // .enter()
                    // .append('circle')
                    // .attr('r', 20)
                    // .style("fill", "#4024e6")

                // svg
                //     .selectAll("textCircle")
                //     .data(nodes)
                //     .enter()
                //     .append("text")
                
                u.exit().remove()
            };

            simulation.force('charge', d3.forceManyBody())
        }
    }
}

Display_bubble_graph.propTypes = {
    width : PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.number,
    data  : PropTypes.array,
};

Display_bubble_graph.defaultProps = {
    width : 1000,
    height: 1000,
    margin: 10,
    data  : [],
};
