const express = require('express');
const router = express.Router();
const Posts = require('../middleware/Posts');

// @route   GET api/posts
// @desc    return list of posts
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    console.log(`calling findByUserId with ${req.params.id}`)
    await Posts.findByUserId(req.params.id, (results, err) => {
      if(err) {
        return res.status(400).json(err);
      }
      else {
        console.log('returning results.');
        res.json(results.rows);
      }
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;