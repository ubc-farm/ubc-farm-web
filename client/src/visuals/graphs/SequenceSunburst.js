import React, { Component } from 'react';
import topojson from 'topojson';
import * as d3 from 'd3';

class SubsequenceSuburst extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      totalSize: 0
    }
  }
  componentWillMount() {
    //load data
    const svg = d3.select(this.refs.anchor),
      { width, height } = this.props;
  }


  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
    this.createVisualization(this.props.data);
  }

  createVisualization(json) {



    // Bounding circle underneath the sunburst, to make it easier to detect
    // when the mouse leaves the parent g.
    var width = 500;
    var height = 500;
    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var vis = d3.select("#chart").append("svg:svg")
      .attr("width", width)
      .attr("height", height)
      .append("svg:g")
      .attr("id", "container")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var partition = d3.partition()
      .size([2 * Math.PI, radius * radius]);

    var arc = d3.arc()
      .startAngle(function (d) { return d.x0; })
      .endAngle(function (d) { return d.x1; })
      .innerRadius(function (d) { return Math.sqrt(d.y0); })
      .outerRadius(function (d) { return Math.sqrt(d.y1); });

    var root = d3.hierarchy(json)
      .sum(function (d) { return d.size; })
      .sort(function (a, b) { return b.value - a.value; });

    // For efficiency, filter nodes to keep only those large enough to see.
    var nodes = partition(root).descendants()
      .filter(function (d) {
        return (d.x1 - d.x0 > 0.005); // 0.005 radians = 0.29 degrees
      });

    var uniqueNames = (function (a) {
      var output = [];
      a.forEach(function (d) {
        if (output.indexOf(d.name) === -1) {
          output.push(d.name);
        }
      });
      return output;
    })(nodes);
    color.domain(uniqueNames);

    var path = vis.data([json]).selectAll("path")
      .data(nodes)
      .enter().append("svg:path")
      .attr("display", function (d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", function (d, i) {
        return color(i + 3);
      })
      .style("opacity", 1)
      .on("mouseover", (d) => { this.mouseover(d) });

    // Add the mouseleave handler to the bounding circle.
    d3.select("#container").on("mouseleave", (d) => { this.mouseleave(d) });

    // Get total size of the tree = value of root node from partition.
    this.setState({ totalSize: path.node().__data__.value });
  };


  // Restore everything to full opacity when moving off the visualization.
  mouseleave(d) {

    // Hide the breadcrumb trail
    d3.select("#trail")
      .style("visibility", "hidden");

    // Deactivate all segments during transition.
    d3.selectAll("path").on("mouseover", null);

    var parentThis = this;
    // Transition each segment to full opacity and then reactivate it.
    d3.selectAll("path")
      .transition()
      .duration(300)
      .style("opacity", 1)
      .on("end", function (_this) {
        var vis = d3.select(this);
        // var parentThis = this;
        vis.on("mouseover", () => {
          parentThis.mouseover(_this)
        });
      });

    d3.select("#explanation")
      .style("visibility", "hidden");
    d3.select("#genus").style("visibility", "hidden");
  }

  mouseover(d) {

    var percentage = d.value;

    d3.select("#explanation").style("visibility", "visible");
    if (d.data.children == undefined) {
      //we have genus too
      d3.select("#genus").style("visibility", "visible");
      d3.select("#genusText").text(d.data.name);
      d3.select("#totalGenus").text(d.value);
      d3.select("#totalSpeciey").text(d.parent.value);
      d3.select("#speciey").text(d.parent.value);

    } else {
      d3.select("#specieyName").text(d.data.name);
      d3.select("#speciey").text(d.value);
    }
    d3.select("#totalSize").text(this.state.totalSize);

    var sequenceArray = d.ancestors().reverse();
    sequenceArray.shift();

    // Fade all the segments.
    d3.selectAll("path")
      .style("opacity", 0.2);

    // Then highlight only those that are an ancestor of the current segment.
    var vis = d3.select("#chart");
    vis.selectAll("path")
      .filter(function (node) {
        return (sequenceArray.indexOf(node) >= 0);
      })
      .style("opacity", 1);
  }

  buildHierarchy(csv) {
    var root = { "name": "root", "children": [] };
    for (var i = 0; i < csv.length; i++) {
      var sequence = csv[i][0];
      var size = +csv[i][1];
      if (isNaN(size)) {
        continue;
      }
      var parts = sequence.split("-");
      var currentNode = root;
      for (var j = 0; j < parts.length; j++) {
        var children = currentNode["children"];
        var nodeName = parts[j];
        var childNode;
        if (j + 1 < parts.length) {
          // Not yet at the end of the sequence; move down the tree.
          var foundChild = false;
          for (var k = 0; k < children.length; k++) {
            if (children[k]["name"] == nodeName) {
              childNode = children[k];
              foundChild = true;
              break;
            }
          }
          // If we don't already have a child node for this branch, create it.
          if (!foundChild) {
            childNode = { "name": nodeName, "children": [] };
            children.push(childNode);
          }
          currentNode = childNode;
        } else {
          // Reached the end of the sequence; create a leaf node.
          childNode = { "name": nodeName, "size": size };
          children.push(childNode);
        }
      }
    }
    return root;
  }

  render() {
    return (
      <div id="main" style={{ display: 'flex' }}>
        <div id="sequence"></div>
        <div id="chart">
          <div style={{ position: 'absolute', top: '384px', left: '250px' }}>
            <span id="totalCount">{this.state.totalSize}</span> species
		      	</div>
        </div>
        <div id="explanation" style={{ visibility: 'hidden' }}>
          <b>Group: </b>
          <span id="specieyName"> </span><br />&#32;&#32;
	        	<span id="speciey"></span>&#32;out of&#32;<span>{this.state.totalSize}</span> (Species)
	        	<br />
          <b>-----------------</b>
          <div id="genus" style={{ visibility: 'hidden' }}>
            <b>Genus: </b>
            <span id="genusText"></span><br />&#32;&#32;
	        		<span id="totalGenus"></span>&#32;out of&#32;<span id="totalSpeciey"></span>
          </div>
        </div>
      </div>
    );
  }
}

const totalSize = 0;

export default SubsequenceSuburst;
