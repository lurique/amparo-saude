const bodyParser = async (request) => {
	let body = ""

	await request.on("data", chunk => {
		body += chunk.toString()
	})

	return JSON.parse(body)
}

module.exports = bodyParser