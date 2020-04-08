const { Pool } = require('pg');
const config = require ('config');
const connectionString = config.get('connectionString');

const pool = new Pool({
  connectionString: connectionString
});

pool.query('SET search_path = "Facebook"');

module.exports = {
  query: async (text, params, callback) => {    
    pool.query(text, params, callback);
  }
};