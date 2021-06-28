import React, { useCallback, useEffect, useMemo } from 'react';
import GraphHelper from '../../shared/graphHelper';
import './result.css';

function ResultComponent({nodes = [], edges = []}) {

	let graph = useMemo(() => new GraphHelper(), []);
	const [adjacencyListNodes, setAdjacencyList] = React.useState([]);

	const getLinks = useCallback(() => {
		return new Promise((res, rej) => {
			setTimeout(() =>{
				res(graph.adjacencyList);
			}, 100);
		})
	}, [graph.adjacencyList]);


	const processData = useCallback(() => {
	
		nodes.forEach(node => {
			graph.addVertex(node);
		});

		edges.forEach(edge => {
			graph.addEdge(edge[0], edge[1], edge[2]);
		});
	}, [nodes, edges, graph]);


	useEffect(() => {
		processData();
		getLinks().then((adjacencyList) => {
			setAdjacencyList(Array.from(adjacencyList));
		}).catch(err => {
			console.log('Something went wrong!');
		})
	}, [processData, getLinks])


	return (
		<div> 
			{adjacencyListNodes.length > 0 ? adjacencyListNodes.map((node, indx) => {
				return <div key={indx}> 
					<div className="node">
						<span className="node-origin">{node[0]}</span>
						{node[1].map((destination, innerIndx) => {
							return <span key={innerIndx}>
								<span className="node-arrow">{'  =>  '}</span>{destination}
							</span>
						})}  
					</div>
				</div>
			}) : null}

		</div>
	);
}

export default ResultComponent;