import { Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { deleteTodo, checkTodo } from "../../redux/todoSlide";

import { DeleteIcon, UndoIcon } from "../icons";

function TodoItem({ todo, index }) {
	const theme =
		todo.priority === "High"
			? "#f44336"
			: todo.priority === "Medium"
			? "#2196f3"
			: todo.priority === "Low"
			? "#4caf50"
			: "";
	const dispatch = useDispatch();

	const handleDeleteTodo = () => {
		dispatch(deleteTodo(todo.id));
	};
	const handleComplete = () => {
		dispatch(checkTodo(todo.id));
	};
	return (
		<div
			className={`${todo.complete ? "line-through" : ""} flex items-center px-3`}
			style={{ color: theme }}
		>
			<FormControlLabel
				onChange={handleComplete}
				control={<Checkbox color="secondary" />}
				label={todo.name}
				checked={todo.complete}
				disabled={todo.complete}
			/>
			<span
				className={`${
					todo.complete ? "opacity-60" : ""
				} ml-auto mr-3 px-1 border-2 rounded-md text-slate-800`}
				style={{ borderColor: theme }}
			>
				{todo.priority}
			</span>
			{todo.complete && (
				<button
					className="hover:bg-slate-100 p-1 rounded-full hover:text-blue-500 transition-colors mr-3 text-slate-800 hover:-rotate-6"
					onClick={handleComplete}
				>
					<UndoIcon />
				</button>
			)}
			<button
				className="hover:bg-slate-100 p-1 rounded-full hover:text-red-500 transition-all text-slate-800 hover:rotate-6"
				onClick={handleDeleteTodo}
			>
				<DeleteIcon />
			</button>
		</div>
	);
}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
};

export default TodoItem;
