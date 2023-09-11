/**
 * d3-hierarchy imports
 */
import { stratify, tree } from "d3-hierarchy";

const g = tree();

export default function adjustNodes(nodes, edges) {
	console.log("[ADJUST_NODES]", nodes, edges);

	if (nodes.length === 0) return { nodes, edges };

	const { width, height } = document
		.querySelector(`[data-id="${nodes[0].id}"]`)
		.getBoundingClientRect();

	const hierarchy = stratify()
		.id((node) => node.id)
		.parentId((node) => edges.find((edge) => edge.target === node.id)?.source);
	const root = hierarchy(nodes);

	console.log("[FETCHED_HEIGHT_WIDTH_BASESD_ON_ZOOM_LEVEL]", width, height);

	const layout = g.nodeSize([100, 80])(root);

	return {
		nodes: layout
			.descendants()
			.map((node) => ({ ...node.data, position: { x: node.x, y: node.y } })),
		edges,
	};
}
