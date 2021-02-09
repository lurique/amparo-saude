const Database = require('../config/database')
const Joi = require('joi')
const { mongoose } = new Database()

const patientModel = mongoose.model("Patients", new mongoose.Schema({
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
	const schema = {
		name: Joi.string().required(),
		cpf: Joi.string().required()
	}

	return Joi.validate(data, schema)
}

exports.Patient = patientModel
exports.ValidatePatient = validatePatientModel