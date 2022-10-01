import { getFullGenre } from "./fakeGenres";

const movies = [
  {
    name: "The dark knight",
    genre: {
      category: "action",
      _id: "61702e2932a8693aba3b2fcb",
    },
    numbersInStock: 42,
    price: 250,
    liked: true,
  },
  {
    name: "Joker",
    genre: {
      category: "adventure",
      _id: "61702e2932a8693aba3b2fcc",
    },
    numbersInStock: 600,
    price: 800,
    liked: true,
  },
  {
    name: "Fast and furious",
    genre: {
      category: "adventure",
      _id: "61702e2932a8693aba3b2fcd",
    },
    numbersInStock: 500,
    price: 560,
    liked: false,
  },
  {
    name: "Hobs and shobs",
    genre: {
      category: "comedy",
      _id: "61702e2932a8693aba3b2fce",
    },
    numbersInStock: 100,
    price: 1000,
    liked: false,
  },
];

export function getMovies() {
  return movies;
}

export function deleteMovie(movie) {
  const index = movies.indexOf(movie);
  movies.splice(index, 1);
  return movies;
}

export function saveMovie(movie) {
  let newMovie = {};
  newMovie.name = movie.title;
  newMovie.genre = getFullGenre().find((gen) => {
    return gen._id === movie.genreId;
  });
  newMovie.numbersInStock = movie.stock;
  newMovie.price = movie.rate;
  newMovie.liked = true;
  movies.push(newMovie);
}
