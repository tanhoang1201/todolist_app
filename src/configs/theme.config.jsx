import { createTheme } from "@mui/material";

export const theme = createTheme({
	typography: {
		fontFamily: ["Poppins", "sans-serif"].join(","),
	},
	spacing: 4,
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
		},
	},
});
