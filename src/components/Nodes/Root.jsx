/**
 * React flow imports
 */
import { Handle, Position } from "reactflow";

/**
 * Custom styles imports
 */
import "./Node.css";

export default function Root() {
	return (
		<>
			<div className="node">Root</div>
			<Handle
				type="source"
				position={Position.Bottom}
			/>
		</>
	);
}
