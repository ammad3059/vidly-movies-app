import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { paginate } from "../services/utils/paginate";
import ListGroup from "./common/listGroup";
import Page from "./common/page";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Movie extends React.Component {
  state = {
    movies: [],
    genres: [],
    movieSize: 3,
    currentPage: 1,
    searchQuery: null,
    selectedGenre: null,
    sortColumn: { path: "title", orderBy: "asc" },
  };

  async componentDidMount() {
    let { data } = await getGenres();
    const names = data.map((d) => {
      return d.name;
    });
    let genres = ["All Genres", ...names];
    let { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  styles = {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 35,
    color: "blue",
    textAlign: "center",
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: null });
  };

  handleDelete = async (movie_id) => {
    let previous = [...this.state.movies];
    const movies = previous.filter((m) => {
      return m._id !== movie_id;
    });
    try {
      this.setState({ movies });
      await deleteMovie(movie_id);
    } catch (ex) {
      this.setState({ movies: previous });
    }
  };

  handleSearchQuery = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (path) => {
    let sortCol = { ...this.state.sortColumn };
    if (sortCol.path === path) {
      sortCol.orderBy = sortCol.orderBy === "asc" ? "desc" : "asc";
    } else {
      sortCol.path = path;
      sortCol.orderBy = "asc";
    }
    this.setState({ sortColumn: sortCol });
  };

  renderSortIcon = (col) => {
    let sortCol = { ...this.state.sortColumn };
    if (sortCol.path === col) {
      if (sortCol.orderBy === "asc") {
        return <i className="fa fa-sort-asc"></i>;
      } else {
        return <i className="fa fa-sort-desc"></i>;
      }
    } else {
      return null;
    }
  };

  render() {
    const {
      movieSize,
      currentPage,
      selectedGenre,
      searchQuery,
      sortColumn,
      movies: all_movies,
      genres: all_genres,
    } = this.state;

    const { history } = this.props;

    let filteredMovies = all_movies;
    if (searchQuery) {
      filteredMovies = filteredMovies.filter((movie) => {
        return movie.title.toLowerCase().startsWith(searchQuery.toLowerCase());
      });
    } else if (selectedGenre && selectedGenre !== "All Genres") {
      filteredMovies = all_movies.filter((m) => {
        return m.genre.name === selectedGenre;
      });
    }
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.orderBy]
    );
    const movies = paginate(sortedMovies, currentPage, movieSize);
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <ListGroup
              items={all_genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            ></ListGroup>
          </div>
          <div className="col-10">
            {this.props.user && (
              <button
                onClick={() => {
                  history.push("/movies/new");
                }}
                className="btn btn-primary"
              >
                New Movie
              </button>
            )}
            <SearchBox value={searchQuery} onSearch={this.handleSearchQuery} />
            <h5 style={this.styles}>
              {filteredMovies.length === 0
                ? "There are no movies"
                : `showing ${filteredMovies.length} movies from the database`}
            </h5>
            <MoviesTable
              user={this.props.user}
              moviesList={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              renderIcon={this.renderSortIcon}
            />
            <Page
              moviesCount={filteredMovies.length}
              pageSize={movieSize}
              currentPage={currentPage}
              onPageClick={this.handlePageChange}
            ></Page>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movie;
