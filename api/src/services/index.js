const { Models } = require('../models')

const dbFind = async (schema, {query, page, limit}) => {
	return await Models[schema].find(query).limit(limit ?? 0).skip(page ? page * 10 : 0)
}

const dbFindOne = async (schema, query) => {
	return await Models[schema].findOne(query)
}

const dbFindOneAndUpdate = async (schema, query, update) => {
	return await Models[schema].findOneAndUpdate(query, update)
}

const dbCountDocuments = async (schema) => {
	return await Models[schema].find().countDocuments()
}

const validateData = async (schema, body) => {
	const { error } = Models[`validate${schema}`](body)
	return error ?? null
}

const dbAddDocument = async (schema, body) => {
	return await new Models[schema](body).save()
}

module.exports = {
	dbFind,
	dbFindOne,
	dbFindOneAndUpdate,
	dbCountDocuments,
	validateData,
	dbAddDocument,
	searchPatients: require('./patients')
}