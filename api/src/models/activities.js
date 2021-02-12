const mongoose = require('mongoose')
const Joi = require('joi')

const activitiesModel = mongoose.model("Activities", mongoose.Schema({
	due_date: {
		type: Date,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true
	},
	patient: {
		type: String,
		required: true
	}
}, {
	timestamps: {
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
}))

const validateActivitiesModel = (data) => {
	const schema = Joi.object({
		due_date: Joi.date().iso().required(),
		status: Joi.string().required(),
		description: Joi.string().required(),
		patient: Joi.string().required()
	})

	return schema.validate(data)
}

exports.Activity = activitiesModel
exports.validateActivity = validateActivitiesModel