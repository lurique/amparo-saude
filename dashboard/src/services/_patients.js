import { requestHandler, serialize } from '../helpers'
import { toast } from 'react-toastify'

export const searchPatients = async (query) => {
	const data = await requestHandler("GET", `/patients/search?${query}`)
	if ( !data || !data.data ) return []
	return data.data
}

export const createPatient = async (e, body) => {
	e.preventDefault();

	const data = serialize(e.target)
	
	let properties = {}
	data.map(d => properties = {...properties, ...d})

	properties.cpf = properties.cpf.split('.').join("")

	const response = await requestHandler("POST", "/patients", properties)
	if ( !response || !response.data ) return toast.error('Ocorreu um erro ao criar seu paciente. Verifique os dados e tente novamente.', {position: "top-right"});
	toast.info('Paciente criado com sucesso!', {position: "top-right"});
	
	return response.data
}
