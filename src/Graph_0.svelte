<script lang="ts">
    import * as d3 from "d3";
    // import { svg } from "d3";
    import { onMount } from "svelte";

    import { draw_grid } from "./draw_d3_grid";

    export let width = 500;
    export let height = 500;
    export let data = [
        { x: 40, y: 0 },
        { x: 10, y: 20 },
        { x: 40, y: 90 },
        { x: 80, y: 50 },
    ];

    let svgElement: SVGSVGElement;
    let tooltipElement: HTMLDivElement;
    let margin = 50;

    onMount(() => {
        let primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--color-primary")
            .trim();
        let secondaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--color-secondary")
            .trim();
        let colorBackground = getComputedStyle(document.documentElement)
            .getPropertyValue("--color-background")
            .trim();

        let svg = d3.select(svgElement);
        let tooltip = d3.select(tooltipElement);

        draw_grid(svg, height, width, margin, secondaryColor);

        let func_tooltip = (d: any, i: any) => {
            // console.log(d);
            // console.log(i);
            // return "Tooltip " + i;

            console.log(x(d.x));
            return "X: " + Math.round(i.x) + " Y: " + Math.round(i.y);
        };
        let func_axis_x = (x: any) => {
            return "" + Math.round(x) + "";
        };
        let func_axis_y = (y: any) => {
            return "" + Math.round(y) + "";
        };

        let x_max = Math.max(...data.map((i) => i.x));
        let y_max = Math.max(...data.map((i) => i.y));
        let x = d3
            .scaleLinear()
            .domain([0, x_max])
            .range([margin, width - margin]);
        let y = d3
            .scaleLinear()
            .domain([0, y_max])
            .range([height - margin, margin]);

        let y_axis = [0, 0.25, 0.5, 0.75, 1];

        svg.selectAll("Lol")
            .data(y_axis.map((x) => x * y_max))
            .enter()
            .append("text")
            .attr("x", 25)
            .attr("y", (d) => y(d) - 2)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            // .style("text-decoration", "underline")
            .attr("fill", secondaryColor)
            // .text(d => d)
            // .text("xx")
            .text((y) => func_axis_y(y));

        svg.selectAll("Lol")
            .data(y_axis.map((x) => x * x_max))
            .enter()
            .append("text")
            .attr("x", (d) => x(d) + 2)
            .attr("y", height - margin / 2 + 5)
            .attr("text-anchor", "left")

            // Text is vertically centered
            // .attr("dominant-baseline", "middle")
            .style("font-size", "16px")
            // .style("text-decoration", "underline")
            .attr("fill", secondaryColor)
            // .text(d => d)
            .text((x) => func_axis_x(x));

        svg.selectAll("whatever")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return x(d.x);
            })
            .attr("cy", function (d) {
                return y(d.y);
            })
            .attr("r", 10)
            .attr("opacity", 0.3)
            .style("fill", "#8c8c8c")

            .on("mouseover", function (d, i) {
                tooltip.transition().duration(100).style("opacity", 0.9);
                tooltip
                    .html(func_tooltip(d, i))

                    // Tooltip is positioned to the mouse event
                    // .style("left", d.clientX + 25 + "px")
                    // .style("top", d.clientY - 0 + "px");

                    // Tooltip is positioned to the circle
                    .style("left", x(i.x) + 30 + "px")
                    .style("top", y(i.y) - 0 + "px");

                d3.select(this).style("opacity", 1);
            })

            .on("mouseout", function (d) {
                tooltip.transition().duration(100).style("opacity", 0);
                d3.select(this).style("opacity", 0.3);
            });
    });
</script>

<div>
    <svg
        bind:this={svgElement}
        class="graph"
        style="width: {width}px; height: {height}px"
    >
    </svg>
    <div bind:this={tooltipElement} class="graph_tooltip">asd</div>
</div>

<style lang="sass">
    @import './style.scss'
</style>
