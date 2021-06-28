
// import { FormControl } from '@material-ui/core';
import React from 'react';
import './addEdges.css';
import EdgeLinkComponent from './edgeLink/edgeLink';

function AddEdgeComponent({destinations, setEdges}) {

	const onAddLinks = (origin, destination, weight) => {
		const copyLinks = [origin, destination, weight];
		setEdges(copyLinks);
	};


	return (
		<div className="edges-container"> 
			<div className="edges">
					{destinations.length > 0 ?  destinations.map((destination, indx) => {
						
						return <div key={indx} className="edge-container"> 
							<EdgeLinkComponent 
								onAddLinks={onAddLinks}
								destinations={destinations} 
								origin={destination} />
						</div>
					}) : null}
			</div>
		</div>
	)
}

export default AddEdgeComponent;