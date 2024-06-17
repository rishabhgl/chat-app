const express = require('express')
const path = require('path')

const app = express()

const PORT = 3000
const public = path.join(__dirname, '../public')

app.use(express.static(public))

app.get('/', (req, res) => {})

app.listen(PORT, () => {
    console.log("Running application!")
})