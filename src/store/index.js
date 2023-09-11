/**
 * React flow imports
 */

/**
 * Redux import
 */
import { createStore } from "redux";

/**
 * State managers
 */
import insertNode from "./stateManagers/insertNode";

/**
 * Utils import
 */
import getRandomId from "./utils/getRandomId";
import deleteNode from "./stateManagers/deleteNode";

/**
 * d3-hierarchy
 */
import adjustNodes from "./stateManagers/adjustNodes";
import deleteNodeAndDescendants from "./stateManagers/deleteNodeAndDescendants";

/**
 * Initial Nodes and Edges State
 */
const rootNode = {
	id: "root",
	type: "root",
	position: { x: 0, y: 100 },
	data: { value: "rootNode", parentId: null, label: "root" },
};
const addNode = {
	id: "add-root",
	position: { x: 0, y: 190 },
	type: "add",
	data: { value: "rootNode", parentId: "root", label: "add" },
};

const initialState = {
	nodes: [rootNode, addNode],
	edges: [
		{
			id: "e1-default",
			source: "root",
			target: "add-root",
			animated: true,
		},
	],
};

const flowReducer = (state = initialState, action) => {
	const initialStateCopy = JSON.parse(JSON.stringify(state));

	console.log("[BEFORE_STATE_UPDATE]", initialStateCopy);

	if (action.type === "ADD_NODE_ROOT") {
		const node = action.payload.node;

		const conditionalNode = {
			id: getRandomId(),
			position: {
				x: node.position.x,
				y: node.position.y,
			},
			type: "conditional",
			data: {
				value: "some conditonal data",
				parentId: node.data.parentId,
			},
		};

		let updatedState = deleteNode(initialStateCopy, node.id);

		updatedState = insertNode(updatedState, conditionalNode, node.id);
		updatedState.edges.push({
			id: getRandomId(),
			source: "root",
			target: conditionalNode.id,
		});

		return updatedState;
	}

	if (action.type === "ADD_NODE") {
		console.log("[ADD_NODE]", initialStateCopy);

		const node = action.payload.node;
		const conditionalNode = {
			id: getRandomId(),
			position: {
				x: node.position.x,
				y: node.position.y,
			},
			type: "conditional",
			data: {
				value: "some conditonal data",
				parentId: node.data.parentId,
			},
		};
		console.log("[DELETING_NODE]", node);
		let updatedState = deleteNode(initialStateCopy, node.id);
		updatedState = insertNode(
			updatedState,
			conditionalNode,
			node.data.parentId
		);
		updatedState.edges.push({
			id: getRandomId(),
			source: node.data.parentId,
			target: conditionalNode.id,
		});

		return adjustNodes(updatedState.nodes, updatedState.edges);
	}

	if (action.type === "DELETE_NODE") {
		const node = action.payload.node;
		console.log("[DELETE_NODE]", node.id, node);

		let updatedState = deleteNodeAndDescendants(initialStateCopy, node.id);

		updatedState = insertNode(
			updatedState,
			{
				id: getRandomId(),
				position: {
					x: node.xPos,
					y: node.yPos,
				},
				type: "add",
				data: { value: "some add data", parentId: node.data.parentId },
			},
			node.data.parentId
		);

		return updatedState;
	}
	return state;
};

const store = createStore(flowReducer);

export default store;
