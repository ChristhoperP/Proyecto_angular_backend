'use strict'

const { Pool } = require('pg');
var dbSocketPath = '/cloudsql/primeval-legacy-289419:us-central1:cactusbbdd'
const dbSocketAddr = '127.0.0.1:5432'.split(":")

module.exports = {
    pool : new Pool({
        //host: '34.69.154.201',
        unix_socket: `${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`,
        user: 'postgres',
        password: 'postgres',
        host: dbSocketAddr[0], // e.g. '127.0.0.1'
        port: dbSocketAddr[1], // e.g. '5432'
    })
}