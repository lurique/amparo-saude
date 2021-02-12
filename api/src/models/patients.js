const mongoose = require('mongoose')
const Joi = require('joi')

const patientModel = mongoose.model("Patients", mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: false
	},
	cpf: {
		type: String,
		required: true,
		unique: true
	}
}, {
	timestamps: {
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
}))

const validatePatientModel = (data) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		cpf: Joi.string().required().min(11).max(11)
	})

	return schema.validate(data)
}

exports.Patient = patientModel
exports.validatePatient = validatePatientModel