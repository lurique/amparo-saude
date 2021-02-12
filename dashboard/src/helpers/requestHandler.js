export const requestHandler = async (method, url, body) => {
	let headers = new Headers()
	headers.append("Content-Type", "application/json");

	let bodyData;
	if ( body ) {
		bodyData = JSON.stringify(body)
	}

	const requestOptions = {
		method,
		headers,
		body: bodyData
	}

	const response = await fetch(url, requestOptions)
	return response.status !== 200 ? Promise.reject(await response.json()) : await response.json()
}