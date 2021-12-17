const express = require('express')
const app     = express()

app.get("/", (req, res) => {
	res.send("it works\n")
});

app.get("/:name", (req, res) => {
	console.log(req.params)
	res.json({status: "ERR: BEEP"})
}) 

app.listen(3000, () => {
	console.log("Running on port 3000")
})