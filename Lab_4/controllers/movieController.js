const axios = require('axios');
const { graphql } = require('graphql');

// GraphQL query for fetching movies
const STAR_WARS_API = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

const getMovies = async (req, res) => {
    try {
        const { title, genre, year } = req.query;
        const query = `{
            allFilms {
                films {
                    title
                    releaseDate
                    producers
                }
            }
        }`;

        const response = await axios.post(STAR_WARS_API, { query });

        let movies = response.data.data.allFilms.films;

        // Search by title
        if (title) {
            movies = movies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
        }

        // Filter by year
        if (year) {
            movies = movies.filter(movie => new Date(movie.releaseDate).getFullYear() === parseInt(year));
        }

        // Filter by genre
        if (genre) {
            movies = movies.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()));
        }

        // (Note: SWAPI GraphQL does not provide genre, but you can simulate or add logic for a genre field)
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error });
    }
};

// Add a new movie (simulated)
const addMovie = (req, res) => {
    const { title, releaseDate, producers } = req.body;
    const newMovie = { id: movies.length + 1, title, releaseDate, producers };
    movies.push(newMovie);
    res.status(201).json(newMovie);
};

// Update movie by ID (simulated)
const updateMovie = (req, res) => {
    const { id } = req.params;
    const { title, releaseDate, producers } = req.body;
    const movie = movies.find(movie => movie.id === parseInt(id));

    if (movie) {
        movie.title = title || movie.title;
        movie.releaseDate = releaseDate || movie.releaseDate;
        movie.producers = producers || movie.producers;
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
};

// Delete movie by ID (simulated)
const deleteMovie = (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === parseInt(id));

    if (movieIndex > -1) {
        const deletedMovie = movies.splice(movieIndex, 1);
        res.status(200).json(deletedMovie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
};

module.exports = {
    getMovies,
    addMovie,
    updateMovie,
    deleteMovie
};