const express = require("express")
const app = express()
const port = 3001
const cors = require("cors")
const axios = require("axios")

app.use(cors())

const cache = {};

app.get("/starships", async (req, res) => {
	const key = JSON.stringify({ class: req.query.class, budget: req.query.budget });
	const now = Date.now();

	if (cache[key] && (now - cache[key].timestamp < 30000)) {
		if (cache[key].data) {
			res.set("X-Cached", "True");
			return res.send(cache[key].data);
		}
		if (cache[key].promise) {
			try {
				const data = await cache[key].promise;
				res.set("X-Cached", "True");
				return res.send(data);
			} catch (err) {
				return res.status(500).send("Error fetching data");
			}
		}
	}

	let resolvePromise, rejectPromise;
	const promise = new Promise((resolve, reject) => {
		resolvePromise = resolve;
		rejectPromise = reject;
	});

	cache[key] = { timestamp: now, promise: promise };

	try {
		const response = await axios.get("https://swapi.dev/api/starships/");
		if (response.data) {
			let results = response.data.results;
			//Apply filters
			if (req.query.class) {
				results = results.filter((starship) => {
					return starship.starship_class.toLowerCase().includes(req.query.class.toLowerCase())
				})
			}
			if (req.query.budget) {
				results = results.filter((starship) => {
					return +starship.cost_in_credits <= req.query.budget
				})
			}

			cache[key] = { timestamp: Date.now(), data: results };
			resolvePromise(results);

			res.set("X-Cached", "False");
			res.send(results);
		} else {
			delete cache[key];
			rejectPromise(new Error("No data"));
			res.send("No starships found");
		}
	} catch (error) {
		console.log(error);
		delete cache[key];
		rejectPromise(error);
		res.status(500).send("Error");
	}
})

app.listen(port, () => console.log(`Galactic conquest started at port ${port}!`))
