const Database = require('../config/database')
const routes = require('../routes')

const DEFAULT_HEADER = { "Content-Type": "application/json" }

const requestHandler = (request, response) => {
	const { mongoose } = new Database()

	const { url, method } = request
	const [ href, route, id ] = url.split('/')

	const key = `/${route}:${method.toLowerCase()}`

	
	response.writeHead(200, DEFAULT_HEADER)

	response.end()
}

module.exports = requestHandler