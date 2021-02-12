const { Models } = require('../models')

const listActivities = async ({limit, page}) => {
	const activities = await Models.Activity.find().limit(limit ?? 0).skip(page ? page * 10 : 0).sort({due_date: -1})
	
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

module.exports = listActivities