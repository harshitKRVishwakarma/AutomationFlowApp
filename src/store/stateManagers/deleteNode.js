export default function deleteNode(state, nodeId) {
	const nodes = state.nodes.filter((node) => node.id !== nodeId);

	const edges = state.edges.filter((edge) => edge.target !== nodeId);

	return { nodes, edges };
}
