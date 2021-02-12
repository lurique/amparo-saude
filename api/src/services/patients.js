const { Models } = require('../models')

const searchPatients = async (query) => {
	const key = Object.keys(query)[0];
	const data = await Models.Patient.aggregate(
		[
			{ 
				$match: {
					[key]: {
						$regex: query[key],
						$options: "gi"
					}
				}
			},
			{
				$skip: 0
			},
			{
				$limit: 10
			}
		]
	)

	return data
}

module.exports = searchPatients