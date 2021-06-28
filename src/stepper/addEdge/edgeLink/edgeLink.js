
import { FormLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';

function EdgeLinkComponent({destinations, origin, onAddLinks}) {

	const [link, setLink] = React.useState('');

	const getRandomWeight = () => {
		return Math.floor(Math.random() * 12) + 2;
	}


	const handleChange = (event) => {
		setLink(event.target.value);
		onAddLinks(origin, event.target.value, getRandomWeight())
	};



	return (<>
		<FormLabel>
			{origin}
		</FormLabel>
		{"-->"}
		<Select
			className="edge-link"
			labelId="demo-simple-select-label"
			id="demo-simple-select"
			value={link}
			onChange={handleChange}
			>
			{destinations.length > 0 ?  destinations.map((destination, indx) => {

				return origin !== destination ? <MenuItem key={indx} value={destination}>{destination}</MenuItem> : null;
			}) : null}
		</Select>
	</>)
}

export default EdgeLinkComponent;