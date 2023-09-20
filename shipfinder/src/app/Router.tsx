import { ReactElement } from "react"
import HomePage from "../views/home"
import { Route, Routes } from "react-router-dom"

const Router: React.FC = (): ReactElement => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
		</Routes>
	)
}

export default Router
