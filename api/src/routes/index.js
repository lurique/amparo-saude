const Services = require('../services')

const routes = {
	"/patients:get": () => console.log('patients get'),
	"/patients:post": () => console.log('patients post'),
	"/patients:put": () => console.log('patients put'),
	"/patients:delete": () => console.log('patients delete')
}

module.exports = routes