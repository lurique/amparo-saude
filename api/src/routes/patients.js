const {
	bodyParser,
	responseHandler
} = require('../helpers')

const {
	dbFind,
	dbFindOne,
	dbAddDocument,
	validateData,
	searchPatients
} = require('../services')

const Patients = {
	list: async function(request, response) {
		try {
			const _id = request.queryString?.id
			const page = request.queryString?.page
			const limit = request.queryString?.limit
			const query = _id ? { _id } : {}

			const data = await dbFind("Patient", {query, page, limit})
			responseHandler(response, {status: 200, message: "Listed patients", body: data})
		} catch ( err ) {
			console.error(err)
			responseHandler(response, {status: 400, message: "An error ocurred", body: err})
		}
	},

	search: async function(request, response) {
		try {
			const data = await searchPatients(request.queryString)
			responseHandler(response, {status: 200, message: "Listed patients", body: data})
		} catch ( err ) {
			console.error(err)
			responseHandler(response, {status: 400, message: "An error ocurred", body: err})
		}
	},

	create: async function(request, response) {
		try {
			const body = await bodyParser(request)
	
			const error = await validateData("Patient", body)
			if ( error ) return responseHandler(response, {status: 400, message: error.details[0].message})

			const alreadyExists = await dbFindOne("Patient", {cpf: body.cpf})
			if ( alreadyExists ) return responseHandler(response, {status: 400, message: "Patient already exists"})

			const saveStatus = await dbAddDocument("Patient", body)
			if ( !saveStatus._id ) return responseHandler(response, {status: 400, message: "Unkown error ocurred while trying to create patient", body: saveStatus})
			
			responseHandler(response, {status: 200, message: "Patient added", body})
		} catch ( err ) {
			console.error(err)
			responseHandler(response, {status: 400, message: "An error ocurred", body: err})
		}
	}
}

module.exports = Patients