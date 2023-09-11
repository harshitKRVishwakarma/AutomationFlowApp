/**
 * React imports
 */
import { useMemo, useEffect } from "react";

/**
 * Redux imports
 */
import { useSelector, useDispatch } from "react-redux";

/**
 * React flow imports
 */
import ReactFlow, {
	MiniMap,
	Controls,
	Background,
	useReactFlow,
} from "reactflow";

/**
 * Custom Nodes
 */
import Add from "./components/Nodes/Add";
import Root from "./components/Nodes/Root";
import Conditional from "./components/Nodes/Conditional";

/**
 * Reactflow styles
 */
import "reactflow/dist/style.css";
import Boolean from "./components/Nodes/Boolean";

function App() {
	console.log("APP RENDERS");
	const nodeTypes = useMemo(
		() => ({
			root: Root,
			add: Add,
			conditional: Conditional,
			boolean: Boolean,
		}),
		[]
	);

	const nodes = useSelector((state) => state.nodes);
	const edges = useSelector((state) => state.edges);
	const dispatch = useDispatch();

	const onNodeClick = (click, node) => {
		console.log("[NODE_CLICKED]", node);

		if (node.id === "add-root") {
			console.log("[ROOT_NODE_CLICKED]", node);

			dispatch({ type: "ADD_NODE_ROOT", payload: { node } });
		}

		if (node.id !== "add-root" && node.type === "add") {
			console.log("[ADD_NODE_CLICKED]", node);

			dispatch({ type: "ADD_NODE", payload: { node } });
		}
	};

	return (
		<>
			<div style={{ width: "100vw", height: "100vh" }}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					onNodeClick={onNodeClick}
					fitView>
					<Controls />
					<MiniMap />
					<Background />
				</ReactFlow>
			</div>
		</>
	);
}

export default App;
