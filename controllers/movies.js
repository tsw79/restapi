const Movie = require("../models/Movie");

module.exports.controller = (app) => {

  // get all movies
  app.get('/api/movies', (req, res) => {
    Movie.find({}, 'title storyline genre release_year runtime', function (err, movies) {
      if (err) { 
        console.log(err); 
      }
      res.send(movies);
    })
  })

  // get a particular movie by its id
  app.get('/api/movies/:id', (req, res) => {
    Movie.findById(req.params.id, 'title storyline genre release_year runtime', function (err, movie) {
      if (err) { 
        console.log(err); 
      }
      res.send(movie);
    })
  })

  // add a new movie
  app.post('/api/movies', (req, res) => { 
    const movie = new Movie({      
      title: req.body.title,
      storyline: req.body.storyline,
      genre: req.body.genre,
      release_year: req.body.release_year,
      runtime: req.body.runtime
    });
    movie.save(function (err, movie) {
      if (err) { 
        console.log(err); 
      }
      res.send(movie);
    })
  })

  // update a movie
  app.put('/api/movies/:id', (req, res) => {
    Movie.findById(req.params.id, 'title storyline genre release_year runtime', function (err, movie) {
      if (err) { 
        console.error(err); 
      }
      // update the movie details
      movie.title = req.body.title;
      movie.storyline = req.body.storyline;
      movie.genre = req.body.genre;
      movie.release_year = req.body.release_year;
      movie.runtime = req.body.runtime;
      // save to db
      movie.save(function (error, movie) {
        if (error) { 
          console.log(error); 
        }
        res.send(movie);
      })
    })
  })

  // delete a movie
  app.delete('/api/movies/:id', (req, res) => {
    Movie.remove({_id: req.params.id}, function(err, movie) {
      if (err) { 
        console.error(err); 
      }
      res.send({ success: true });
    })
  })
}