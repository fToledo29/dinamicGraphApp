class GraphHelper {
	constructor(){
		this.adjacencyList = new Map(); 
	}

	addVertex(vertex = null) {
		if (!(!vertex)) {
			this.adjacencyList.set(vertex, []);
		}
	}

	addEdge(origin, destination) {
		this.adjacencyList.get(origin).push(destination);
		this.adjacencyList.get(destination).push(origin);
	}

	/**
	 * Breadth-First Search
	 */
	bfs(start) {

		let visited = new Set();

		const queue = [start];

		let count = 1;

		while (queue.length > 0) {

			const airport = queue.shift();

			const destinations = this.adjacencyList.get(airport);

			for(let destination of destinations) {

				if (destination === 'VKO') {
					console.log('Destination found: [', destination, '] in ', count, ' steps');
				}

				if (!visited.has(destination)) {
					visited.add(destination);
					queue.push(destination);
					console.log(destination);
					count++;
				}
			}
			

		}
	}

	/**
	 * Depth-First Search
	 */
	dfs(start, visited = new Set(), steps = 0) {

		console.log(start);

		visited.add(start);

		const destinations = this.adjacencyList.get(start);

		for (let destination of destinations) {
			if (destination === "VKO") {
				console.log('Destination found: [', destination, '] in ', steps, ' steps');
				return;
			}

			if (!visited.has(destination)) {
				this.dfs(destination, visited, steps + 1);
			}
		}
	

	}
}

export default GraphHelper;