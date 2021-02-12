const { Models } = require('../models')

const listActivities = async ({query, limit, page}) => {
	const activities = await Models.Activity.find(query).limit(limit ?? 10).skip(page ? page * 10 : 0).sort({due_date: -1})

	const data = []
	for ( let activity of activities ) {
		const { patient } = activity
		const patientData = await Models.Patient.findOne({_id: patient})

		let nameAndCpf = {
			_id: patientData._id,
			name: patientData.name,
			cpf: patientData.cpf
		}

		delete activity._doc.__v
		data.push({...activity._doc, patient: nameAndCpf})
	}

	return data
}

const searchActivities = async ({query}) => {
	const patient = await Models.Patient.findOne({cpf: query.cpf})
	
	delete query.cpf
	query.patient = patient._id

	const response = await listActivities({query});

	return response
}

module.exports = {
	listActivities,
	searchActivities
}