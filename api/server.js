const express = require("express")
const app = express()
const port = 3001
const cors = require("cors")
const axios = require("axios")

app.use(cors())

app.get("/starships", async (req, res) => {
	await axios
		.get("https://swapi.dev/api/starships/")
		.then((response) => {
			if (response.data) {
				//Apply filters
				if (req.query.class) {
					response.data.results = response.data.results.filter((starship) => {
						return starship.starship_class.toLowerCase().includes(req.query.class.toLowerCase())
					})
				}
				if (req.query.budget) {
					response.data.results = response.data.results.filter((starship) => {
						return +starship.cost_in_credits <= req.query.budget
					})
				}
				res.send(response.data.results)
			} else {
				res.send("No starships found")
			}
		})
		.catch((error) => {
			console.log(error)
		})
})

app.listen(port, () => console.log(`Galactic conquest started at port ${port}!`))
