import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "uuid";

import TodoItem from "../../components/TodoItem";
import { todosRemaining } from "../../redux/selector";
import { fetchTodo, addTodo } from "../../redux/todoSlide";

const top100Films = [{ label: "High" }, { label: "Medium" }, { label: "Low" }];

function Todo() {
	const [name, setName] = useState("");
	const [priority, setPriority] = useState({ label: "Medium" });
	const dispatch = useDispatch();

	const todos = useSelector(todosRemaining);
	const loading = useSelector((state) => state.todo.loading);

	const handleAddTodo = () => {
		dispatch(
			addTodo({
				name,
				complete: false,
				priority: priority.label,
			})
		);
		setName("");
		setPriority({ label: "Medium" });
	};

	useEffect(() => {
		dispatch(fetchTodo());
	}, []);

	return (
		<section className="flex flex-1 flex-col overflow-y-auto ">
			<div className="overflow-overlay flex-1 overflow-y-auto">
				{todos.map((todo, index) => (
					<TodoItem key={v4()} todo={todo} index={index} />
				))}
				{loading && (
					<div className="inline-block absolute top-3/5 left-1/2 -translate-x-1/2">
						<div className="w-7 h-7 border-[3px] border-t-transparent border-purple-500 animate-spin rounded-full"></div>
					</div>
				)}
			</div>
			<div className="flex gap-1 mt-auto items-center pt-5 bg-white border-t-2 border-blue-500">
				<input
					value={name}
					type="text"
					className="p-2 outline-none border focus:border-blue-500 transition-colors flex-1 rounded hover:border-blue-500"
					placeholder="Add todo..."
					onChange={(e) => setName(e.target.value)}
				/>
				<Autocomplete
					disablePortal
					size="small"
					disableClearable
					onChange={(e, value) => {
						setPriority(value);
					}}
					freeSolo
					options={top100Films}
					value={priority}
					sx={{
						width: 120,
					}}
					renderInput={(params) => <TextField {...params} label="Priority" />}
				/>
				<button
					className="bg-blue-500 text-white px-3 rounded self-stretch active:bg-opacity-60 transition-colors"
					onClick={handleAddTodo}
				>
					Add
				</button>
			</div>
		</section>
	);
}

export default Todo;
