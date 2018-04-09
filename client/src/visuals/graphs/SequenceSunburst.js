import React, {Component} from 'react';
import * topojson from 'topojson';
import * as d3 from 'd3';

class SubsequenceSuburst extends Component {
	
	constructor(props) {
		this.state = {
			userData: null,
			usCongress: null
		}
	}
	componentWillMount(){
		//load data
		const svg = d3.select(this.refs.anchor),
		{width, height} = this.props;

	}

	componentDidUpdate(){
		//render d3 example
		var vis = d3.select(this.ref).append("svg:svg")
	    .attr("width", width)
	    .attr("height", height)
	    .append("svg:g")
	    .attr("id", "container")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		var partition = d3.layout.partition()
	    	.size([2 * Math.PI, radius * radius])
	    	.value(function(d) { return d.size; });

		var arc = d3.svg.arc()
		    .startAngle(function(d) { return d.x; })
		    .endAngle(function(d) { return d.x + d.dx; })
		    .innerRadius(function(d) { return Math.sqrt(d.y); })
		    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });
	}


	render(){
		const { usData, usCongress } = this.state

		if(!usData || !usCongress){
			return null
		}

		return <g ref="anchor" />
	}
}

export default SubsequenceSuburst;