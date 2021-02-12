const routes = require('../routes')
const { parseQueryString } = require('./')
const responseHandler = require('./responseHandler')

const DEFAULT_HEADER = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT",
	"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Max-Age": 2592000
}

const requestHandler = (request, response) => {
	const { url, method } = request

	if ( request.method === "OPTIONS" ) {
		response.writeHead(204, DEFAULT_HEADER)
		return response.end()
	}
	
	if ( url.indexOf('?') !== -1 ) {
		console.log(url);
		request.queryString = parseQueryString(url.split('?')[1])
	}

	const key = `${url.split('?')[0]}:${method.toLowerCase()}`

	response.DEFAULT_HEADER = DEFAULT_HEADER
	response.writeHead(200, DEFAULT_HEADER)

	const selectedRoute = routes[key] || routes.default
	return selectedRoute(request, response)
}

module.exports = requestHandler