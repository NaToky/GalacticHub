import React from "react"
import Router from "./Router"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"

const theme = createTheme({
	palette: {
		primary: {
			main: "#1a237e",
		},
		secondary: {
			main: "#ff1744",
		},
	},
})

const App = () => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router />
			</ThemeProvider>
		</>
	)
}

export default App
