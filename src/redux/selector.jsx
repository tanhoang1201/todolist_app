import { createSelector } from "@reduxjs/toolkit";

const todoSelector = (state) => state.todo.todoList;
const searchSelector = (state) => state.filters.search;
const statusSelector = (state) => state.filters.status;
const prioritySelector = (state) => state.filters.priority;

export const todosRemaining = createSelector(
	todoSelector,
	searchSelector,
	statusSelector,
	prioritySelector,
	(todoList, search, status, priority) => {
		return todoList.filter((todo) => {
			if (status === "All") {
				return priority.length > 0
					? todo.name.toLowerCase().includes(search.toLowerCase()) &&
							priority.includes(todo.priority)
					: todo.name.toLowerCase().includes(search.toLowerCase());
			} else {
				const statusFilter = status === "Complete" ? true : false;
				return (
					todo.name.toLowerCase().includes(search.toLowerCase()) &&
					todo.complete === statusFilter &&
					(priority.length > 0 ? priority.includes(todo.priority) : true)
				);
			}
		});
	}
);
