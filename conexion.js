'use strict'

const { Pool } = require('pg');

module.exports = {
    pool : new Pool({
        host: '34.69.154.201',
        user: 'postgres',
        password: 'postgres',
        database: 'postgres',
        port: 5432
    })
}