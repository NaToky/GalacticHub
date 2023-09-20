import React, { useEffect } from "react"
import { Stack } from "@mui/material"
import background from "../assets/background.jpg"
import SearchBar from "../components/SearchBar"
import SearchResults from "../components/SearchResults"
import { searchShips } from "../app/store/searchSlice"
import { useAppDispatch } from "../app/store"
const HomePage = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(searchShips())
	}, [dispatch])

	return (
		<Stack
			sx={{
				backgroundImage: `url(${background})`,
				width: "100vw",
				height: "100vh",
				backgroundSize: "cover",
				backgroundPosition: "center",
				display: "flex",
			}}
		>
			<SearchBar />
			<SearchResults />
		</Stack>
	)
}

export default HomePage
