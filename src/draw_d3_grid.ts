
export function draw_grid(svg, height: number, width: number, margin: number, color: string) {
    // Bottom horizontal line
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", height - margin)
        .attr("x2", width)
        .attr("y2", height - margin)
        .style("stroke-dasharray", "3, 3")
        .style("stroke", color);

    // Left vertical line
    svg.append("line")
        .attr("x1", margin)
        .attr("y1", 0)
        .attr("x2", margin)
        .attr("y2", height)
        .style("stroke-dasharray", "3, 3")
        .style("stroke", color);

    // Top horizontal line
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", margin)
        .attr("x2", width)
        .attr("y2", margin)
        .style("stroke-dasharray", "3, 3")
        .style("stroke", color);

    // Right vertical line
    svg.append("line")
        .attr("x1", width - margin)
        .attr("y1", 0)
        .attr("x2", width - margin)
        .attr("y2", height)
        .style("stroke-dasharray", "3, 3")
        .style("stroke", color);
}
