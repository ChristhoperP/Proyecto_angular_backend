'use strict'

const { Pool } = require('pg');
var dbSocketPath = '/cloudsql/primeval-legacy-289419:us-central1:cactusbbdd'

module.exports = {
    pool : new Pool({
        //host: '34.69.154.201',
        unix_socket: `${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`,
        user: 'postgres',
        password: 'postgres',
        database: 'postgres',
        port: 5432
    })
}