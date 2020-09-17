'use strict'

const { Pool } = require('pg');

module.exports = {
    pool : new Pool({
        //host: '34.69.154.201',
        host: '/cloudsql/primeval-legacy-289419:us-central1:cactusbbdd',
        user: 'postgres',
        password: 'postgres',
        database: 'postgres',
        port: 5432
    })
}