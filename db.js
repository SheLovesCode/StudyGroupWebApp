'use strict'

const mssql = require('mssql')
// Make sure this is private to this module
const config = {
  server: 'kudusql.database.windows.net',
  database: 'KuduDB',
  // Put login details in env. variables for security
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  port: 1433,
  // Required for Azure
  options: {
    encrypt: true,
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
}
// Get a mssql connection instance
let isConnected = true
let connectionError = null
const pools = new mssql.ConnectionPool(config)
  .connect()
  .then(pool => {
    return pool
  })
  .catch(err => {
    // Handle errors
    isConnected = false
    connectionError = err
  })
module.exports = {
  sql: mssql,
  pools: pools,
  config: config,
  isConnected: isConnected,
  connectionError: connectionError
}
