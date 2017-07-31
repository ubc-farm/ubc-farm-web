/**
 * Created by Xingyu on 7/25/2017.
 */

import {fetchSuppliers} from '../../../finances/actions/supplier-actions'
import React, { Component } from 'react'
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

        let chart_svg = d3.select(node),
            WIDTH = 350,
            HEIGHT = 250,
            MARGINS = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            },
            radius = Math.min(WIDTH, HEIGHT) / 2,
            g = chart_svg.append("g")
                .attr("transform", "translate(" + WIDTH/2 + "," + HEIGHT/2 + ")");

        let color = d3.scaleOrdinal(d3.schemeCategory10);

        let pie = d3.pie()
            .sort(null)
            .value(function(d) { return d.quantity; });

        let path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(50);

        let label = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        let arc = g.selectAll(".arc")
            .data(pie(this.props.data))
            .enter().append("g")
            .attr("class","arc");

        arc.append("path")
            .attr("d",path)
            .attr("fill",function(d){return color(d.name); });

        arc.append("text")
            .attr("transform", function(d){ return "translate(" + label.centroid(d) + ")"; })
            .attr("dy","0.35em")
            .text(function(d){ return d.name});
    }
    render(){
        return <svg ref={node => this.node = node} width={"50%"} height={250}>
        </svg>
    }
}

export default PieChart;

