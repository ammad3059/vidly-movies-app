import http from "./httpService";

export function getMovie(movie_id) {
  return http.get("http://localhost:3900/api/movies" + "/" + movie_id);
}
export function getMovies() {
  return http.get("http://localhost:3900/api/movies");
}

export function deleteMovie(movie_id) {
  return http.delete("http://localhost:3900/api/movies" + "/" + movie_id);
}

export function saveMovie(movie) {
  if (movie._id) {
    console.log("In updation");
    let newMovie = {};
    newMovie.title = movie.title;
    newMovie.numberInStock = movie.stock;
    newMovie.dailyRentalRate = movie.rate;
    newMovie.genreId = movie.genreId;
    return http.put(
      "http://localhost:3900/api/movies" + "/" + movie._id,
      newMovie
    );
  } else {
    console.log("In creationn");
    let newMovie = {};
    newMovie.title = movie.title;
    newMovie.numberInStock = movie.stock;
    newMovie.dailyRentalRate = movie.rate;
    newMovie.genreId = movie.genreId;
    return http.post("http://localhost:3900/api/movies", newMovie);
  }
}
