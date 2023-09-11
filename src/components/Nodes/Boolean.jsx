/**
 * React imports
 */

/**
 * React flow imports
 */
import { Handle, Position } from "reactflow";
/**
 * Custom styles imports
 */
import "./Node.css";

export default function Boolean(props) {

	return (
		<>
			<Handle
				type="target"
				position={Position.Top}
			/>
			<div className="node">
				{props.data.value ? "Yes" : "No"}
			</div>
			<Handle
				type="source"
				position={Position.Bottom}
			/>
		</>
	);
}
