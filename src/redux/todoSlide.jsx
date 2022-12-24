import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { dbInstance } from "../configs/firebase.config";

const todoSlider = createSlice({
	name: "todo",
	initialState: {
		todoList: [],
		loading: false,
		error: "",
	},
	reducers: {
		add: (state, action) => {
			state.todoList.push(action.payload);
		},
		del: (state, action) => {
			state.todoList.splice(action.payload, 1);
		},
		check: (state, action) => {
			const currentTodo = state.todoList.find((t) => t.id === action.payload);
			currentTodo.complete = !currentTodo.complete;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodo.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(fetchTodo.fulfilled, (state, action) => {
				state.todoList = action.payload;
				state.loading = false;
			})
			.addCase(fetchTodo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addTodo.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(addTodo.fulfilled, (state, action) => {
				state.todoList.push(action.payload);
				state.loading = false;
			})
			.addCase(addTodo.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(deleteTodo.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.todoList.map((todo, index) => {
					if (todo.id === action.payload) {
						state.todoList.splice(index, 1);
					}
				});
				state.loading = false;
			})
			.addCase(deleteTodo.rejected, (state, action) => {
				state.loading = false;
			})
			.addCase(checkTodo.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(checkTodo.fulfilled, (state, action) => {
				const currentTodo = state.todoList.find((t) => t.id === action.payload);
				currentTodo.complete = !currentTodo.complete;
				state.loading = false;
			});
	},
});

export const fetchTodo = createAsyncThunk("fetchTodo", async () => {
	try {
		const res = await getDocs(dbInstance);
		const todoList = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return todoList;
	} catch (error) {
		return error.message;
	}
});

export const addTodo = createAsyncThunk("addTodo", async (todo) => {
	try {
		const res = await addDoc(dbInstance, todo);
		return { id: res.id, ...todo };
	} catch (error) {
		return error.message;
	}
});

export const deleteTodo = createAsyncThunk("deleteTodo", async (todoId) => {
	try {
		const docInstance = doc(dbInstance, todoId);
		await deleteDoc(docInstance);
		return todoId;
	} catch (error) {
		return error.message;
	}
});

export const checkTodo = createAsyncThunk("checkTodo", async (todoId) => {
	try {
		const docInstance = doc(dbInstance, todoId);
		await getDoc(docInstance).then((doc) => {
			updateDoc(docInstance, { complete: !doc.data().complete });
		});
		return todoId;
	} catch (error) {
		return error.message;
	}
});

// export const { del, check, add } = todoSlider.actions;
export default todoSlider.reducer;
