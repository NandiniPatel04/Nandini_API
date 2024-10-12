const express = require('express');
const {
    getMovies,
    addMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movieController');

const router = express.Router();

// GET movies
router.get('/', getMovies);

// POST movie (create)
router.post('/', addMovie);

// PUT movie (update)
router.put('/:id', updateMovie);

// DELETE movie
router.delete('/:id', deleteMovie);

module.exports = router;
