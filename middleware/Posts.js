const db = require('../config/db');

const findByUserId = async (userId, callback) => {
  await db.query("SELECT id, user_id as userId, title, post as text, uri FROM \"Facebook\".posts where user_id = $1 and uri <> '' ORDER BY timestamp DESC LIMIT 100",[userId], (error, results) => {
    callback(results, error);
  });
}

module.exports = {
  findByUserId
};