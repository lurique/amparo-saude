export const isoToDateString = (dateString) => {
	const splitDate = dateString.split('T')[0]
	const date = splitDate.split('-') 
	return `${date[2]}/${date[1]}/${date[0]}`
}

export const dateStringToIso = (dateString) => {
	const date = dateString.split('/')
	return `${date[2]}-${date[1]}-${date[0]}T00:00:00.000Z`
}