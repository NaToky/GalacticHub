import React, { useEffect, useState } from "react"
import { Box, Button, TextField } from "@mui/material"
import { searchShips, setClassFilter, setBudgetFilter, setNameFilter } from "../app/store/searchSlice"
import { RootState, useAppDispatch } from "../app/store"
import { useSelector } from "react-redux"
const SearchBar = () => {
	const dispatch = useAppDispatch()

	const loading = useSelector((state: RootState) => state.search.loading)

	const results = useSelector((state: RootState) => state.search.searchResults)

	const budgetFilter = useSelector((state: RootState) => state.search.budgetFilter)

	const handleShipClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setClassFilter(event.target.value))
	}

	const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setBudgetFilter(+event.target.value ? +event.target.value : Infinity))
	}

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNameFilter(event.target.value))
	}

	const handleExploreClick = () => {
		dispatch(searchShips())
	}

	const nameFilter = () => {
		return (
			<TextField
				sx={{ m: 2, backgroundColor: "white", borderRadius: "5px", flex: 1 }}
				size="small"
				id="outlined-basic"
				label="Filter by name ..."
				variant="standard"
				onChange={handleNameChange}
			/>
		)
	}

	return (
		<>
			<Box
				sx={{
					mt: 5,
					display: "flex",
					maxWidth: "800px",
					alignItems: "center",
					alignSelf: "center",
					height: "80px",
				}}
			>
				<TextField
					sx={{ m: 2, backgroundColor: "white", borderRadius: "5px", flex: 1 }}
					size="small"
					id="outlined-basic"
					label="Starship class ..."
					variant="filled"
					onChange={handleShipClassChange}
				/>
				<TextField
					sx={{ m: 2, backgroundColor: "white", borderRadius: "5px", flex: 1 }}
					size="small"
					id="outlined-basic"
					InputProps={{
						inputProps: {
							type: "number",
							min: 0,
						},
					}}
					value={budgetFilter}
					label="Budget (credits) ..."
					variant="filled"
					onChange={handleBudgetChange}
				/>
				<Button variant="contained" color="primary" onClick={handleExploreClick}>
					Explore
				</Button>
			</Box>
			<Box sx={{ display: "flex", alignSelf: "center", maxWidth: "800px" }}>
				{results && results.length > 0 && !loading && nameFilter()}
			</Box>
		</>
	)
}

export default SearchBar
