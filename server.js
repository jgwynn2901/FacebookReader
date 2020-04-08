const express = require('express');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// init middleware
app.use(express.json({extended: false}));

app.get('/', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM users');
  res.send(rows);
});

// define routes
app.use('/api/users',require('./routes/users'));

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
