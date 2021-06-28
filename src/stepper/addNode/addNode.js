import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";

import Tooltip from "@material-ui/core/Tooltip";
import { FormGroup } from "@material-ui/core";

const styles = {
	done: {
		textDecoration: "line-through",
		opacity: ".5",
		display: "flex",
		width: "100%"
	},
	header: {
		justifyContent: "center",
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	main: {
		width: "100%",
		maxWidth: "400px",
		margin: "20px auto"
	},
	card: {
		padding: "20px",
		margin: "20px 0"
	},
	todo: {
		position: "relative",
		display: "flex",
		flexFow: "row",
		// alignContent: "space-between",
		//     display: flex;
    		justifyContent: "space-around"
	},
	label: {
		display: "flex",
		width: "100%"
	},
	divider: {
		position: "absolute",
		width: "100%",
		top: 0
	},
	nodeText: {
		display: "flex",
		justifyItems: "center",
		justifyContent: "center",
		alignItems: "center",
	}
};



export default class AddNodeComponent extends React.Component {

	constructor() {
		super();
		this.state = {
			nodes: [],
			newNode: "",
		};
		this.onTextUpdate = this.onTextUpdate.bind(this);
		this.addNode = this.addNode.bind(this);
		this.deleteNode = this.deleteNode.bind(this);
	}

	onTextUpdate(e) {
		this.setState({ newNode: e.target.value });
	}

	addNode() {
		let { nodes, newNode } = this.state;
		if (nodes.includes(newNode)) {
			return;
		}
		nodes.push(newNode);
		this.setState({ nodes: nodes, newNode: "" });
		this.props.onAddNodes(nodes);
	}

	deleteNode(node) {
		let { nodes } = this.state;
		nodes.splice(nodes.indexOf(node), 1);
		this.setState({ nodes: nodes, newNode: "" });
		this.props.deleteNode(node);
	}

	render() {
		const { nodes, newNode } = this.state;

		return (
			<div id="main" style={styles.main}>
				<header style={styles.header}>
				<FormGroup>
					<TextField
					label="Add new node"
					value={newNode}
					onChange={this.onTextUpdate}
					/>
				</FormGroup>
				<Button
				variant="contained"
				disabled={!newNode}
				onClick={this.addNode}
				>
				Add
				</Button>
				</header>
				{nodes.length > 0 && (
				<Card style={styles.card}>
				<FormGroup>
					{nodes.map((node, index) => (
						<div key={index} style={styles.todo}>
							{index > 0 ? <Divider style={styles.divider} /> : ""}
							<div style={styles.nodeText}>
								<span>
									{node}
								</span>
							</div>
							<Tooltip title="Delete node" placement="top">
								<IconButton
									aria-label="delete"
									onClick={() => this.deleteNode(node)}>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						</div>
					))}
				</FormGroup>
				</Card>
				)}
			</div>
		);
	}
}
