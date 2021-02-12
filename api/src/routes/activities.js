const {
	bodyParser,
	responseHandler
} = require('../helpers')

const {
	dbFindOneAndUpdate,
	dbCountDocuments,
	dbAddDocument,
	validateData
} = require('../services')

const {
	listActivities,
	searchActivities
} = require('../services/activities')

const Activities = {
	list: async function(request, response) {
		try {
			const _id = request?.queryString?.id
			const page = request.queryString?.page
			const limit = request.queryString?.limit
			const query = _id ? { _id } : {}

			const data = await listActivities({query, page, limit})
			responseHandler(response, {status: 200, message: "Listed activities", body: data})
		} catch ( err ) {
			console.error(err)
			responseHandler(response, {status: 400, message: "An error ocurred", body: err})
		}
	},

	search: async function(request,  response) {
		try {
			const query = await bodyParser(request)

			if ( !query.due_date || query.due_date === "" ) delete query.due_date
			if ( !query.status || query.status === "0" ) delete query.status
			if ( !query.cpf || query.cpf === "" ) delete query.cpf
			
			const data = await searchActivities({query})
			responseHandler(response, {status: 200, message: "Activities counted", body: data})
		} catch ( err ) {
			console.error(err)
			responseHandler(response, {status: 400, message: "An error ocurred", body: err})
		}
	},

	count: async function(request, response) {
		try {
			const count = await dbCountDocuments("Activity")
			responseHandler(response, {status: 200, message: "Activities counted", body: count})
		} catch ( err ) {
			console.error(err)
			responseHandler(response, {status: 400, message: "An error ocurred", body: err})
		}
	},

	create: async function(request, response) {
		try {
			const body = await bodyParser(request)
	
			const error = await validateData("Activity", body)
			if ( error ) return responseHandler(response, {status: 400, message: error.details[0].message})

			if (
				body.status !== "aberto" &&
				body.status !== "finalizado" &&
				body.status !== "atrasado" 
			) return responseHandler(response, {status: 400, message: "Activity status not allowed", body: body.status})

			const saveStatus = await dbAddDocument("Activity", body)
			if ( !saveStatus._id ) return responseHandler(response, {status: 400, message: "Unkown error ocurred while trying to create activity", body: saveStatus})
			
			responseHandler(response, {status: 200, message: "Activity added", body})
		} catch ( err ) {
			console.error(err)
			responseHandler(response, {status: 400, message: "An error ocurred", body: err})
		}
	},

	update: async function(request, response) {
		try {
			const body = await bodyParser(request)

			if (
				!body ||
				!body.status ||
				!body._id
			) return responseHandler(response, {status: 400, message: "Missing params", body})

			if (
				body.status !== "aberto" &&
				body.status !== "finalizado" &&
				body.status !== "atrasado" 
			) return responseHandler(response, {status: 400, message: "Activity status not allowed", body: body.status})

			const updateStatus = await dbFindOneAndUpdate("Activity", {_id: body._id}, {status: body.status})
			if ( !updateStatus._id ) return responseHandler(response, {status: 400, message: "Update didn't succeed.", body})
			
			responseHandler(response, {status: 200, message: "Activity has been updated", body: updateStatus})
		} catch ( err ) {
			console.error(err)
			responseHandler(response, {status: 400, message: "An error ocurred", body: err})
		}
	}
}

module.exports = Activities