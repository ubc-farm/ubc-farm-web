/**
 * Created by Xingyu on 7/17/2017.
 */
import React, { Component } from 'react'
import * as d3 from 'd3'


class LogScatter extends Component {
    constructor(props){
        super(props);
        this.createBarChart = this.createBarChart.bind(this)
    }
    componentDidMount() {
        this.forceUpdate();
        this.createBarChart();
    }
    createBarChart() {
        const node = this.node;



        let vis = d3.select(node),
            WIDTH = 350,
            HEIGHT = 250,
            MARGINS = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 50
            },
            xRange = d3.scaleTime().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(this.props.data, function(d) {
                return d.x;
            }), d3.max(this.props.data, function(d) {
                return d.x;
            })]),
            yRange = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, d3.max(this.props.data, function(d) {
                return d.y * 1.5;
            })]),
            xAxis = d3.axisBottom(xRange),
            yAxis = d3.axisLeft(yRange).ticks(5, "s");


        console.log(this.props.data);

        vis.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
            .call(xAxis);

        vis.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
            .call(yAxis);

        let valueline = d3.line()
            .x(function(d) {
                return xRange(d.x);
            })
            .y(function(d) {
                return yRange(d.y);
            });

        //Append the Data Line
        vis.append('path')
            .data([this.props.data])
            .attr('d', valueline)
            .attr('stroke', '#84a23c')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

        //Append the Graph Title
        vis.append("text")
            .attr("x", (WIDTH / 2))
            .attr("y", (MARGINS.top))
            .attr("text-anchor", "middle")
            .style("font-size", "11px")
            .style("color","#cccccc")
            .text(this.props.title + " Availability over Time");

    }
    render() {
        return <svg  ref={node => this.node = node}
                    width={"50%"} height={250}>
        </svg >
    }
}

export default LogScatter