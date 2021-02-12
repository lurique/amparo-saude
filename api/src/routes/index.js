const fs = require('fs')
const path = require('path')
const Patients = require('./patients')
const Activities = require('./activities')
const { responseHandler } = require('../helpers')

const routes = {
	"/patients:get": (request, response) => Patients.list(request, response),
	"/patients/search:get": (request, response) => Patients.search(request, response),
	"/patients:post": (request, response) => Patients.create(request, response),
	"/activities:get": (request, response) => Activities.list(request, response),
 	"/activities:post": (request, response) => Activities.create(request, response),
	"/activities:put": (request, response) => Activities.update(request, response),
	"/activities/count:get": (request, response) => Activities.count(request, response),

	default: (request, response) => {
        let filePath = request.url;

        if ( filePath == '/' ) {
            filePath = 'public/index.html';
        } else {
            filePath = 'public' + request.url;
        }

        let extname = String(path.extname(filePath)).toLowerCase();
        let mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.wasm': 'application/wasm',
            '.ico' : 'image/x-icon'
        };

        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, function(error, content) {
            if (error) return responseHandler(response, {status: 500, message: "An error ocurred", body: error})
                
			response.writeHead(200, { 'Content-Type': contentType });
			response.end(content, 'utf-8');
        });
	}
}

module.exports = routes