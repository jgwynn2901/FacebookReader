const db = require('../config/db');

const getUsers = async (callback) => {
  console.log('getUsers running');
  await db.query('SELECT * FROM "Facebook".users ORDER BY user_name ASC', (error, results) => {
    if (error) {
      console.log('Error: ' + error);
      throw error;
    }
    console.log('getUsers done');
    callback(results.rows);
  });
}

const findById = (id, callback) => {
  console.log('user.findById: ' + id);
  db.query('SELECT * FROM "Facebook".users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    callback(results.rows[0]);
  });
}

const getUserByEmail = async (email, callback) => {
  await db.query('SELECT * FROM "Facebook".users WHERE email = $1', [email], (error, results) => {
    if (error) {
      callback(null);
    }
    callback(results.rows[0]);
  });
}

const createUser = async (user, callback) => {
  const { name, email, password } = user;
  const results = await db.query('INSERT INTO "Facebook".users (name, email, password) VALUES ($1, $2, $3)', [name, email, password], (error, results) => {
    callback(results ? results.rows[0]: {}, error);
  });
}

const deleteUser = async (id, callback) => {
  await db.query('DELETE FROM "Facebook".users WHERE id = $1', [id], (error, results) => {
    callback(`User deleted with ID: ${id}`, error);
  })
}

module.exports = {
  getUsers,
  getUserByEmail,
  findById,
  createUser,
  deleteUser,
}