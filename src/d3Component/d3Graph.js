import React from 'react';
import * as d3 from 'd3';
import dagreD3 from 'dagre-d3'
import './d3Graph.css';

class D3Component extends React.Component {

	constructor(props) {
		super(props);
	    	this.container = React.createRef();
	    	this.ge = React.createRef();
		this.createGraph.bind(this);
	}

	componentDidMount() {
		this.createGraph(this.props.nodes, this.props.edges);
	}

	componentDidUpdate() {
		this.createGraph(this.props.nodes, this.props.edges);
	}

	createGraph(airports, routes) {
		var g = new dagreD3.graphlib.Graph({directed: true})
			.setGraph({
				nodesep: 30,
				ranksep: 40,
				rankdir: "LR",
				marginx: 10,
				marginy: 120
			}).setDefaultEdgeLabel(() => ({}));

		// Here we"re setting nodeclass, which is used by our custom drawNodes function below.
		airports.forEach(airport => {
			g.setNode(airport,  
			{ 
				label: airport, 
				class: `${airport}-airport`,
			});
		});

		g.nodes().forEach(function(v) {
			var node = g.node(v);
			// Round the corners of the nodes
			node.rx = node.ry = 5;
		});



		routes.forEach((route, indx) => {
			let svg_edge_label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			let edge_tspan = document.createElementNS('http://www.w3.org/2000/svg','tspan');
			edge_tspan.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
			edge_tspan.setAttribute('dy', '1em');
			edge_tspan.setAttribute('x', '1');
			let edge_link = document.createElementNS('http://www.w3.org/2000/svg', 'a');
			edge_link.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'http://google.com/');
			edge_link.setAttribute('target', '_blank');
			edge_link.textContent = indx;
			edge_tspan.appendChild(edge_link);
			svg_edge_label.appendChild(edge_tspan);

			g.setEdge(route[0], route[1], { labelType: "svg", label: svg_edge_label });
		})

		// Create the renderer
		let render = new dagreD3.render();

		// Set up an SVG group so that we can translate the final graph.
		let svg = d3.select(this.container.current);
		let svgGroup = d3.select(this.ge.current);
		// Run the renderer. This is what draws the final graph.
		render(d3.select(this.container.current), g);


		// Center the graph
		let xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
		svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
		svg.attr("height", g.graph().height + 40);
	}

	render() {
		return (
			<svg 
			ref={this.container} 
			id="nodeTree" 
			width="960" 
			height="700">
				<g ref={this.ge}/>
			</svg>
		);
	}
};

export default D3Component;