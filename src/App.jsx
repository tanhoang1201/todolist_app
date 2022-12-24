import { ThemeProvider } from "@mui/material";
import Filter from "./layouts/Filter";
import Todo from "./layouts/Todo";
import { theme } from "./configs/theme.config";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="w-[450px] mx-auto mt-10  bg-white rounded-md shadow-sd p-3 ">
				<div className="flex flex-col h-[650px] relative">
					<h1 className="font-semibold text-center text-lg mb-10">TODO APP WITH REDUX</h1>
					<Filter />
					<hr className="my-5" />
					<Todo />
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
