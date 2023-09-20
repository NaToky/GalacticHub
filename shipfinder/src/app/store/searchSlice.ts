import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../rootReducer"

type Ship = {
	name: string
	starship_class: string
	cost_in_credits: number
	crew: number
	passengers: number
	manufacturer: string
	cargo_capacity: number
}

interface SearchState {
	classFilter: string
	budgetFilter: number
	nameFilter: string
	searchResults: Ship[]
	filteredResults: Ship[]
	loading: boolean
	searchResultsError: string | null
}

const initialState: SearchState = {
	classFilter: "",
	budgetFilter: Infinity,
	nameFilter: "",
	searchResults: [],
	filteredResults: [],
	loading: false,
	searchResultsError: null,
}

export const searchShips = createAsyncThunk("search/searchShips", async (_, { getState }): Promise<Ship[]> => {
	const state = getState() as RootState
	const classFilter = state.search.classFilter
	const budgetFilter = state.search.budgetFilter
	const response = await fetch(`http://localhost:3001/starships/?class=${classFilter}&budget=${budgetFilter}`)
	if (!response.ok) {
		throw new Error("Failed to fetch ships")
	}
	const ships = await response.json()
	return ships
})

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		setClassFilter(state, action: PayloadAction<string>) {
			state.classFilter = action.payload
		},
		setBudgetFilter(state, action: PayloadAction<number>) {
			state.budgetFilter = action.payload
		},
		setNameFilter(state, action: PayloadAction<string>) {
			state.nameFilter = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(searchShips.pending, (state) => {
			state.loading = true
			state.searchResultsError = null
		})
		builder.addCase(searchShips.fulfilled, (state, action) => {
			state.loading = false
			state.searchResults = action.payload
		})
		builder.addCase(searchShips.rejected, (state, action) => {
			state.loading = false
			state.searchResultsError = action.error.message ? action.error.message : null
		})
	},
})

export const { setClassFilter, setBudgetFilter, setNameFilter } = searchSlice.actions

export default searchSlice.reducer
