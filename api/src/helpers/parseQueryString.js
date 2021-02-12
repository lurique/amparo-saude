const parseQueryString = (query) => {
	try {
		const params = query.split('&')
	
		let obj = {}
		for ( param of params ) {
			let splitted = param.split('=')
			obj[splitted[0]] = splitted[1]
		}
	
		return obj
	} catch (err) {
		console.error("[ERR]: Error while parsing query strings", err)
		return {}
	}
}

module.exports = parseQueryString