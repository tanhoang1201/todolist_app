import {
	Autocomplete,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { priorityChange, searchChange, statusChange } from "../../redux/filtersSlide";

const top100Films = [
	{ id: 1, title: "High", color: "blue" },
	{ id: 3, title: "Medium", color: "red" },
	{ id: 2, title: "Low", color: "green" },
];

function Filter() {
	const dispatch = useDispatch();
	const handleSearch = debounce((e) => {
		dispatch(searchChange(e.target.value));
	}, 700);
	const handlePriorityChange = (value) => {
		const priorities = value.map((priority) => priority.title);
		// console.log(priorities);
		dispatch(priorityChange(priorities));
	};
	return (
		<section className="flex flex-col gap-5">
			<div className="flex flex-col gap-1">
				<label htmlFor="search" className="font-semibold">
					Search
				</label>
				<input
					spellCheck={false}
					type="text "
					className="p-2 outline-none border focus:border-blue-500 transition-colors rounded text-textDark dark:border-none hover:border-blue-500"
					placeholder="Enter keyword..."
					onChange={handleSearch}
				/>
			</div>
			<FormControl>
				<FormLabel
					sx={{
						fontWeight: "600",
						color: "text.primary",
					}}
				>
					Gender
				</FormLabel>
				<RadioGroup
					row
					aria-labelledby="demo-row-radio-buttons-group-label"
					name="gender"
					defaultValue={"All"}
					onChange={(e, value) => {
						dispatch(statusChange(value));
					}}
				>
					<FormControlLabel value="All" control={<Radio />} label="All" />
					<FormControlLabel value="Complete" control={<Radio />} label="Complete" />
					<FormControlLabel value="Todo" control={<Radio />} label="Todo" />
				</RadioGroup>
			</FormControl>
			<Autocomplete
				sx={{
					"& 	.MuiFormLabel-root": {
						color: "text.primary",
					},
				}}
				multiple
				onChange={(e, value) => handlePriorityChange(value)}
				disableCloseOnSelect
				filterSelectedOptions
				size="small"
				options={top100Films}
				isOptionEqualToValue={(option, value) => option.id === value.id}
				getOptionLabel={(option) => option.title}
				// defaultValue={[top100Films[1]]}
				renderInput={(params) => (
					<TextField {...params} label="Priority" placeholder="Select priority..." />
				)}
			/>
		</section>
	);
}

export default Filter;
