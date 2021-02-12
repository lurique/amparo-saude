const mongoose = require('mongoose')

class Database {
	constructor() {
		this.mongoose = mongoose
	}

	async connect() {
		const { DB_USER, DB_NAME, DB_PASS } = process.env

		const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@amparo-saude.wzcf1.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
		await this.mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		})
		.then(() => console.log(`[INFO] Database connected`))
		.catch(err => console.error(`[ERROR] Database error: ${err}`))
	}
}

module.exports = Database