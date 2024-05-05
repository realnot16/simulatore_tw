const express = require('express')
var dt = require('./db.js');
var sim = require("./simulation.js")

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(sim.startSim())
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})