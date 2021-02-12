import { requestHandler, serialize, dateStringToIso } from '../helpers'
import { toast } from 'react-toastify'

export const listActivities = async (query) => {
	let url = "/activities"
	if ( query ) url = `/activities${query}`

	const data = await requestHandler("GET", url)
	if ( !data || !data.data ) return []
	return data.data
}

export const updateActivity = async (body) => {
	const data = await requestHandler("PUT", "/activities", body)
	if ( !data || !data.data ) return []
	return data.data
}

export const countActivities = async () => {
	const data = await requestHandler("GET", "/activities/count")
	if ( !data || !data.data ) return 0
	return data.data
}

export const createActivity = async (e, selectedPatient) => {
	e.preventDefault();

	const data = serialize(e.target)
	
	let properties = {}
	data.map(d => properties = {...properties, ...d})

	properties.patient = selectedPatient.value
	properties.due_date = dateStringToIso(properties.due_date)

	const response = await requestHandler("POST", "/activities", properties)
	if ( !response || !response.data ) return toast.error('Ocorreu um erro ao criar sua atividade. Verifique os dados e tente novamente.', {position: "top-right"});
	toast.info('Atividade cadastrada com sucesso!', {position: "top-right"});
	return response.data
}