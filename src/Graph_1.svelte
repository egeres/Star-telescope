<script lang="ts">
    import * as d3 from "d3";
    // import { svg } from "d3";
    import { onMount } from "svelte";

    import { draw_grid } from "./draw_d3_grid";

    export let width = 500;
    export let height = 500;
    export let data : Array<Object> = [
        { name: "Python", radius: 300 },
        { name: "Rust", radius: 100 },
        { name: "JS", radius: 40 },
        { name: "Other", radius: 1 },
    ];

    // Given a target min and a max, scales the radius values of the data entries
    let min = 5;
    let max = 50;

    let data_transformed = data.map((d) => ({
        name: d.name,
        // radius: min + (max - min) * Math.random(),
        radius: Math.min(
            max,
            Math.max(min, ((d.radius - min) / max) * (max - min) + min),
        ),
    }));

    // console.log(nodes)

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

        draw_grid(svg, height, width, margin, secondaryColor);

        console.log(data_transformed);

        var u = svg.selectAll("g").data(data_transformed);

        var g = u
            .enter()
            .append("g")
            .attr("transform", function (d) {
                return "translate(" + width / 2 + "," + height / 2 + ")";
            });

        var circles = g
            .append("circle")
            .attr("r", (d) => d.radius)
            .style("fill", "#e62424");

        var texts = g
            .append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .style("fill", "#e6e2e2e2")
            .attr("dy", ".35em")

            // Text cannot be selected
            .style("-webkit-user-select", "none")
            .style("-moz-user-select", "none")
            .style("-ms-user-select", "none")
            .style("user-select", "none")

            .text(function (d) {
                return d.name;
            });

        var simulation = d3
            .forceSimulation(data_transformed)
            .alphaDecay(0.03)
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("attractForce", d3.forceManyBody().strength(200))
            .force(
                "collision",
                d3.forceCollide().radius(function (d) {
                    return d.radius;
                }),
            )
            .on("tick", ticked);

        function ticked() {
            u = svg.selectAll("g").data(data_transformed);

            g = u
                .enter()
                .append("g")
                .merge(u)
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });
        }
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
