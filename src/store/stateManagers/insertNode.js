/**
 * Utils imports
 */
import getRandomId from "../utils/getRandomId";

/**
 * @description Inserts a node to the state
 */
export default function insertNode(state, node, parentId) {
	console.log("[INSERT_NODE]", state, node, parentId);

	state.nodes.push(node);

	if (node.type === "conditional") {
		console.log("[ADDING_CONDITIONAL_NODE]");

		const booleanNodeTrue = {
			id: getRandomId(),
			position: {
				x: node.position.x - 150,
				y: node.position.y + 100,
			},
			type: "boolean",
			data: { value: true, parentId: node.id },
		};
		state.edges.push({
			id: getRandomId(),
			source: node.id,
			target: booleanNodeTrue.id,
		});

		insertNode(state, booleanNodeTrue, node.id);

		const booleanNodeFalse = {
			id: getRandomId(),
			position: {
				x: node.position.x + 150,
				y: node.position.y + 100,
			},
			type: "boolean",
			data: { value: false, parentId: node.id },
		};
		state.edges.push({
			id: getRandomId(),
			source: node.id,
			target: booleanNodeFalse.id,
		});

		insertNode(state, booleanNodeFalse, node.id);
	}

	if (node.type === "boolean") {
		console.log("[ADDING_BOOLEAN_NODE]");

		const addNode = {
			id: getRandomId(),
			position: {
				x: node.position.x,
				y: node.position.y + 100,
			},
			type: "add",
			data: { value: "some add data", parentId: node.id },
		};

		insertNode(state, addNode, node.id);
	}

	if (node.type === "add") {
		console.log("[ADDING_ADD_NODE]");
		
		state.edges.push({
			id: getRandomId(),
			source: parentId,
			target: node.id,
		});
	}

	console.log("[UPDATED_STATE]", state);
	return state;
}
