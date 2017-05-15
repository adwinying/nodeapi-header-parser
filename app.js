const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 8000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/whoami', (req, res) => {
	const result = {
		ipaddress: null,
		language: null,
		software: null
	}

	result.ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress
	result.language  = req.headers['accept-language'].split(',')[0]
	result.software  = req.headers['user-agent'].split(/\(|\)/g)[1]

	res.json(result)
})

app.listen(port)
console.log('Server started on port', port, '\n')