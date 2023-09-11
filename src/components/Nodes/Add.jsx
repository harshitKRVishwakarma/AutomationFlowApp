/**
 * React flow imports
 */
import { Handle, Position } from "reactflow";

/**
 * Custom styles imports
 */
import "./Node.css";

export default function Add() {
	return (
		<>
			<Handle
				type="target"
				position={Position.Top}
			/>
			<div className="node">Add</div>
		</>
	);
}
