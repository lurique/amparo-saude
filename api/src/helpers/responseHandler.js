const responseHandler = (response, {status, message, body}) => {
	if ( !response || !status ) return

	response.writeHead(status, response.DEFAULT_HEADER)
	response.write(JSON.stringify({status, message, data: body ?? []}))
	response.end()
}

module.exports = responseHandler