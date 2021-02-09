class Services {
	constructor() {
		this.data = ""
	}

	Patients = {
		list(id) {
			console.log("listing");
		},
		insert(data) {
			console.log("inserting");
		},
		update(id, data) {
			console.log("updating");
		},
		remove(id) {
			console.log("removing");
		}
	}
}

module.exports = Services