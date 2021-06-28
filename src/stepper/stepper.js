import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddNodeComponent from './addNode/addNode';
import AddEdgeComponent from './addEdge/addEdge';
import './stepper.css';
import ResultComponent from './result/result';


const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
	},
	resetContainer: {
		padding: theme.spacing(3),
	},
}));


// const airports = ['LAX', 'ATL', 'DFW', 'ORD', 'MEX', 'AMS', 'JFK', 'LOS', 'VKO', 'IST', 'LHR','AMS', 'CUN', 'BOM', 'TYO'];


function getSteps() {
  return ['Please Add Node Names', 'Link Nodes'];
}


function SetupStepper() {

	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const [links, setLinks] = React.useState([]);
	const [nodes, setNodes] = React.useState([]);
	const [nodesReady, setNodesReady] = React.useState([]);
	const [linksReady, setLinksReady] = React.useState([]);
	const [resultDone, setDone] = React.useState(false);
	const steps = getSteps();


	const getStepContent = (step, onAddLinks, onAddNodes) => {
		switch (step) {
		case 0:
			return <AddNodeComponent onAddNodes={onAddNodes} deleteNode={deleteNode}/>
		case 1:
		return <AddEdgeComponent destinations={nodes} setEdges={onAddLinks} />
		default:
		return 'Unknown step';
		}
	}

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleOnApply = () => {
		setDone(true);
		setNodesReady(nodes);
		setLinksReady(links)
	}

	const handleReset = () => {
		setActiveStep(0);
	};

	const deleteNode = (node) => {
		const copyNodes = [nodes];
		copyNodes.splice(copyNodes.indexOf(node), 1);
		setNodes(copyNodes);
	}

	const onAddLinks = (edges) => {
		const copyLinks =  [...links];
		const indx = copyLinks.findIndex(x => x[0] === edges[0]);
		if (indx !== -1) {
			copyLinks.splice(indx, 1);
		}
		copyLinks.findIndex(x => x[1] === edges[0] && x[0] === edges[1])-
		copyLinks.push(edges);
		setLinks(copyLinks);
	};

	const onAddNodes = (newNodes) => {
		setNodes(newNodes);
	};

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((label, index) => (
				<Step key={label}>
					<StepLabel className="step-label">{label}</StepLabel>
					<StepContent>
						{getStepContent(index, onAddLinks, onAddNodes)}
					<div className={classes.actionsContainer}>
						<div>
						<Button
							variant="contained"
							disabled={activeStep === 0}
							onClick={handleBack}
							className={classes.button}>
							Back
						</Button>
						{activeStep < steps.length - 1 ? <Button
							variant="contained"
							color="primary"
							onClick={handleNext}
							className={classes.button}>
								{'Next'}
						</Button> : <Button
							variant="contained"
							color="primary"
							onClick={handleOnApply}
							className={classes.button}>
								{'Apply graph parameters'}
						</Button> }
						</div>
					</div>
					</StepContent>
				</Step>
				))}
			</Stepper>
			{activeStep === steps.length && (
				<Paper square elevation={0} className={classes.resetContainer}>
				<Typography>All steps completed!</Typography>
				<Button
					variant="contained"
					disabled={activeStep === 0}
					onClick={handleBack}
					className={classes.button}>
					Back
				</Button>
				<Button 
					variant="contained" 
					color="secondary"
					onClick={handleReset} 
					className={classes.button}>
					Reset
				</Button>
				</Paper>
			)}

			{ resultDone ? <ResultComponent nodes={nodesReady} edges={linksReady} /> : null}
		</div>
  	);
}

export default SetupStepper;