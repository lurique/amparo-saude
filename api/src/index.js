const http = require('http')
const Database = require('./config/database')
const requestHandler = require('./helpers/requestHandler')

require('dotenv').config()

// Starting database
new Database().connect()

const PORT = process.env.APP_PORT ?? 3000
http.createServer(requestHandler)
    .listen(PORT, () => console.log(`\r\n[INFO] Server is running at :${PORT ?? 3000}`))