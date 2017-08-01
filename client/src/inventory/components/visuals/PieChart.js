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
                .attr("transform", "translate(" + WIDTH/2 + "," + parseInt(HEIGHT/2 + 10) + ")");

        let color = d3.scaleOrdinal(d3.schemeCategory10);

        let pie = d3.pie()
            .sort(null)
            .value(function(d) { return d.quantity; });

        let path = d3.arc()
            .outerRadius(radius - 20)
            .innerRadius(30);

        let label = d3.arc()
            .outerRadius(radius+10)
            .innerRadius(radius-10);

        let arc = g.selectAll(".arc")
            .data(pie(this.props.data))
            .enter().append("g")
            .attr("class","arc");

        let tooltip = d3.select(div).append("div").attr("class", "pieToolTip");

        arc
            .on("mousemove", function(d){
                tooltip.style("left", d3.event.pageX - offsets.left +10+"px");
                tooltip.style("top", d3.event.pageY - offsets.top -25+"px");
                tooltip.style("display", "inline-block");
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

        arc.append("text")
            .attr("transform", function(d){ return "translate(" + label.centroid(d) + ")"; })
            .attr("dy","0.35em")
            .attr("font", "sans-serif")
            .attr("font-size", "10px")
            .attr("text-anchor", "middle")
            .text(function(d){return d.data.name});

        chart_svg.append("text")
            .attr("x", (WIDTH / 2))
            .attr("y", (MARGINS.top))
            .attr("text-anchor", "middle")
            .style("font-size", "11px")
            .style("color","#cccccc")
            .text("Supplier Breakdown");
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

