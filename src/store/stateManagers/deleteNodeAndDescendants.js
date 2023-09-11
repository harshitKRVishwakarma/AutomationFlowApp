export default function deleteNodeAndDescendants(state, nodeId) {
	// Find the node to delete by its ID
	const nodeToDelete = state.nodes.find((node) => node.id === nodeId);

	if (!nodeToDelete) {
		// Node not found
		return;
	}

	// Recursively delete descendants
	function deleteDescendants(nodeId) {
		const descendants = state.nodes.filter(
			(node) => node.data.parentId === nodeId
		);

		for (const descendant of descendants) {
			deleteDescendants(descendant.id);
		}

		// Remove the node and its associated edges
		state.nodes = state.nodes.filter((node) => node.id !== nodeId);
		state.edges = state.edges.filter(
			(edge) => edge.source !== nodeId && edge.target !== nodeId
		);
	}

	// Delete the node and its descendants
	deleteDescendants(nodeId);

	
	return state;
}
