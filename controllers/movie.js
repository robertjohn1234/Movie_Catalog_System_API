const Movie = require('../models/Movie');

module.exports.addMovie = (req, res) => {
    return Movie.findOne({ title: req.body.title }).then(existingMovie => {
        if (existingMovie) {
            return res.status(409).send({ error: 'Movie already exists' });
        }

        let newMovie = new Movie({
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
            description: req.body.description,
            genre: req.body.genre,
            comments: req.body.comments
        });

        return newMovie.save().then(savedMovie => {
            res.status(201).send({ savedMovie });
        }).catch(saveError => {
            console.error('Error in saving the movie: ', saveError);
            res.status(500).send({ error: 'Failed to save the movie' });
        });

    }).catch(findErr => {
        console.error('Error in finding the movie: ', findErr);
        return res.status(500).send({ message: "Error in finding the movie" });
    });
};

module.exports.getAllMovies = (req, res) => {
	
	return Movie.find({}).then(movies => {
		
		if(movies.length > 0) {
			
			return res.status(200).send({ movies });
			
		} else {
			
			return res.status(200).send({ message : 'No movies found.' })
		}
		
	}).catch(findErr => {
		
		console.error('Error in finding all movies: ', findErr);
		
		return res.status(500).send({ error : 'Error finding movies.'})
	});
};

module.exports.getMovieById = (req, res) => {
	
	return Movie.findById(req.params.id).then(movie => {
		
		if(!movie) {
			
			return res.status(404).send({ error: 'Movie not found '});
			
		}
		
		return res.status(200).send({ movie });
		
	}).catch(findErr => {
		
		console.error('Error finding movies: ', findErr);
		
		return res.status(500).send({ error : 'Failed to fetch movie'});
	});
};

module.exports.updateMovie = (req, res) => {
    let movieId = req.params.id;

    let updatedMovie = {
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        description: req.body.description,
        genre: req.body.genre
    };

    return Movie.findByIdAndUpdate(movieId, updatedMovie, { new: true }).then(updatedMovie => {
        if (updatedMovie) {
            return res.status(200).send({
                message: 'Movie updated successfully',
                updatedMovie: updatedMovie
            });
        } else {
            return res.status(404).send({ error: 'Movie not found' });
        }
    }).catch(updateErr => {
        console.error('Error in updating the movie: ', updateErr);
        return res.status(500).send({ error: 'Error in updating the movie' });
    });
};

module.exports.deleteMovie = (req, res) => {

    return Movie.deleteOne({ _id: req.params.id})
    .then(deletedResult => {

        if (deletedResult < 1) {
            return res.status(400).send({ error: 'No Movie deleted' });
        }

        return res.status(200).send({ 
        	message: 'Movie deleted successfully'
        });

    })
    .catch(err => {
		console.error("Error in deleting an Movie : ", err)
		return res.status(500).send({ error: 'Error in deleting an Movie.' });
	});
};

module.exports.addMovieComments = (req, res) => {

    let movieId = req.params.id;
    let newComment = {
        user: req.user.email,
        comment: req.body.comment,
        date: new Date()
    };

    return Movie.findById(movieId).then(movie => {
        if (movie) {
            movie.comments.push(newComment);
            return movie.save().then(updatedMovie => {
                return res.status(200).send({
                    message: 'Comment added successfully',
                    updatedMovie: updatedMovie
                });
            }).catch(saveErr => {
                console.error('Error in saving the comment: ', saveErr);
                return res.status(500).send({ error: 'Error in saving the comment' });
            });
        } else {
            return res.status(404).send({ error: 'Movie not found' });
        }
    }).catch(findErr => {
        console.error('Error in finding the movie: ', findErr);
        return res.status(500).send({ error: 'Error in finding the movie' });
    });
};

module.exports.getMovieComments = (req, res) => {
    let movieId = req.params.id;

    return Movie.findById(movieId).then(movie => {
        if (movie) {
            return res.status(200).send({
                message: 'Comments retrieved successfully',
                comments: movie.comments
            });
        } else {
            return res.status(404).send({ error: 'Movie not found' });
        }
    }).catch(findErr => {
        console.error('Error in finding the movie: ', findErr);
        return res.status(500).send({ error: 'Error in finding the movie' });
    });
};