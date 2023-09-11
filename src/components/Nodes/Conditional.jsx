/**
 * React imports
 */
import { useRef } from "react";

/**
 *  React flow imports
 */
import { Handle, Position } from "reactflow";

/**
 * Redux imports
 */
import { useDispatch } from "react-redux";

/**
 * Custom styles imports
 */
import "./Node.css";

export default function Conditional(props) {
	const deleteButtonRef = useRef(null);

	const dispatch = useDispatch();

	const handleMouseEnter = () => {
		deleteButtonRef.current.classList.add("show");
	};

	const handleMouseLeave = () => {
		deleteButtonRef.current.classList.remove("show");
	};

	const onClickHandler = () => {
		dispatch({ type: "DELETE_NODE", payload: { node: props } });
	};

	return (
		<>
			<Handle
				type="target"
				position={Position.Top}
			/>
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className="node">
				Conditional
				<button
					className="delete-button"
					ref={deleteButtonRef}
					onClick={onClickHandler}>
					Delete
				</button>
			</div>
			<Handle
				type="source"
				position={Position.Bottom}
			/>
		</>
	);
}
