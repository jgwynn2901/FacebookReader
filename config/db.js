const { Pool } = require('pg');
const config = require ('config');
const connectionString = config.get('connectionString');
console.log('Connecting to: ' + connectionString);

const pool = new Pool({
  connectionString: connectionString
});


console.log('Before connect');
const client = pool.connect();
console.log('Connected!');
console.log('Before small query');
const sql = 'SELECT * FROM "Facebook".users ORDER BY user_name ASC';

//pool.query('SET search_path = "Facebook"');
//console.log('SET search_path = "Facebook");
var results = {
  query: async (text, params, callback) => {    
    return await pool.query(text, params, callback);
  }
};

const result = results.query(sql);
    console.log( result);

module.exports = results;