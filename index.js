const express = require('express');
const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

let movies = [
  {
    id: 1,
    name: 'god father',
    genre: 'action'
  },
  {
    id: 2,
    name: 'romeo and juliet',
    genre: 'family'
  },
  {
    id: 3,
    name: 'rambo',
    genre: 'action'
  },

];

// get post delete put

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('<h1>welcome to MovieBox</h1>');
});

app.get('/api/genres', (req, res) => {
  res.send(movies);
});


app.get('/api/genres/:genre', (req, res) => {
  const {genre} = req.params;
  const filteredMovies = movies.filter( movie => movie.genre === genre ? true : false);
  res.send(filteredMovies);
  console.log(filteredMovies);
});

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
app.post('/api/genres', (req, res) => {
  const movie = {
    id: movies.length + 1,
    name: req.body.name,
    genre: req.body.genre
  };
  movies.push(movie);
  res.send(movies);
});

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
app.delete('/api/genres/:id', (req, res) => {
  let {id} = req.params;
  id = Number(id);
  
  let index = undefined;
  movies.forEach((movie, i) => {
    if (movie.id === id) {
      index = i;
    }
  });
  if (index !== undefined) {
    movies.splice(index, 1);
    res.send(movies);
  } else{
    res.send('<h3>The id is invalid. Please enter an invalid id</h3>')
  }
});

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
app.put('/api/genres/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let index = undefined;
  let updatingMovie = movies.filter((movie, i) => {
    if (movie.id === id) {
      index = i;
      return true;
    }
    return false;
  });
  console.log(updatingMovie);
  movies[index] = {
    id: updatingMovie[0].id,
    name: updatingMovie[0].name,
    genre: req.body.genre
  };
  res.send(movies)

});

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});