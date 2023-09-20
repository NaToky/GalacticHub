import React from "react"
import { Box, CircularProgress, List, ListItem, ListItemText, Stack, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { RootState } from "@/app/rootReducer"
import { useSelector } from "react-redux"
const SearchResults = () => {
	const { searchResults, loading } = useSelector((state: RootState) => state.search)
	const nameFilter = useSelector((state: RootState) => state.search.nameFilter)
	const filteredResults = searchResults.filter((result) => result.name.toLowerCase().includes(nameFilter.toLowerCase()))

	if (loading) return <CircularProgress sx={{ alignSelf: "center" }} />

	if (filteredResults.length === 0)
		return (
			<Typography variant="h4" sx={{ alignSelf: "center" }}>
				No results found
			</Typography>
		)

	return (
		<>
			<List
				sx={{
					position: "relative",
					alignSelf: "center",
					overflowY: "auto",
					maxHeight: "70vh",
					width: "100%",
					maxWidth: 600,
				}}
			>
				{filteredResults.map((result) => (
					<ListItem
						key={result.name}
						sx={{
							color: "black",
							border: "1px solid black",

							fontSize: "1.5rem",
							fontWeight: "bold",
							backgroundColor: "rgba(255, 255, 255, 0.4)",
						}}
					>
						<ListItemText primary={result.name} secondary={result.starship_class} />
						<Stack sx={{ textAlign: "center" }}>
							<Typography
								variant="body2"
								sx={{ alignSelf: "center", fontSize: "1.1rem", fontWeight: "bold", color: "rgba(22, 154, 134, 1)" }}
							>
								{result.cost_in_credits + " cr"}
							</Typography>
							<Typography variant="body2">Crew: {result.crew}</Typography>
							<Typography variant="body2">Passengers: {result.passengers}</Typography>
							<Typography variant="body2">Cargo_capacity: {result.cargo_capacity}</Typography>
						</Stack>
					</ListItem>
				))}
			</List>
			{filteredResults.length !== searchResults.length && (
				<Typography variant="h6" sx={{ alignSelf: "center", color: "red" }}>
					Showing {filteredResults.length} of {searchResults.length} results
				</Typography>
			)}
		</>
	)
}

export default SearchResults
