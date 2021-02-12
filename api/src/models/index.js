const { Patient, validatePatient } = require('./patients')
const { Activity, validateActivity } = require('./activities')

exports.Models = {
	Patient,
	validatePatient,
	Activity,
	validateActivity
}