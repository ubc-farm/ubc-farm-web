/**
 * Created by Xingyu on 7/25/2017.
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as d3 from 'd3'

class PieChart extends Component {
    componentDidMount(){
        this.forceUpdate();
        this.createPieChart();
    }
    constructor(props) {
        super(props);

        this.createPieChart = this.createPieChart.bind(this);
    }
    createPieChart(){
        const node = this.node;
        const div = this.div;
        const offsets = this.props.offsets;
        const total = this.props.total;
        const legendRectSize = 12;
        const legendSpacing = 4;

        console.log(offsets);

        let chart_svg = d3.select(node),
            WIDTH = 350,
            HEIGHT = 250,
            MARGINS = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            },
            radius = Math.min(WIDTH, HEIGHT) / 2 - 20,
            g = chart_svg.append("g")
                .attr("transform", "translate(" + (WIDTH/2 - 50) + "," + parseInt(HEIGHT/2 + 10) + ")");

        let color = d3.scaleOrdinal(d3.schemeCategory10);

        let pie = d3.pie()
            .sort(null)
            .value(function(d) { return d.quantity; });

        let path = d3.arc()
            .outerRadius(radius)
            .innerRadius(70);


        let arc = g.selectAll(".arc")
            .data(pie(this.props.data))
            .enter().append("g")
            .attr("class","arc");

        let tooltip = d3.select(div).append("div")
            .attr("class", "pieToolTip")
            .attr("top","80px");

        arc
            .on("mouseover", function(d){
                tooltip.html(
                    "Quantity: " + (d.data.quantity) +
                    "<br/>"+
                    "Percentage: " + parseInt(((d.data.quantity)/total)*100)+"%");
            });
        arc
            .on("mouseout", function(d){
                tooltip.style("display", "none");
            });
        arc.exit().remove();


        arc.append("path")
            .attr("d",path)
            .attr("fill",function(d,i){return color(i%10); })
            .attr("stroke", "#fff");

        chart_svg.append("text")
            .attr("x", (WIDTH / 2))
            .attr("y", (MARGINS.top))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("color","#cccccc")
            .text("Supplier Breakdown");


        let legend = chart_svg.selectAll('.legend')
            .data(this.props.data)
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr("font-size", "10px")
            .attr('transform', function(d, i) {
                let horz = -2 * legendRectSize;
                let vert = i * (legendRectSize + legendSpacing);
                return 'translate(' + (WIDTH - 70 + horz) + ',' + (MARGINS.top + vert + 15) + ')';
            });
        legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', function(d,i){return color(i%10)})
            .style('stroke', function(d,i){return color(i%10)});

        legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing + 3)
            .text(function(d) { return d.name; });
    }
    render(){
        return (
            <div ref={node => this.div = node} style={{display: "inline-block"}}>
        <svg ref={node => this.node = node} width={350} height={250}>
        </svg>
            </div>)
    }
}

export default PieChart;

