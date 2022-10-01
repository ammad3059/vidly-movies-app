import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import Input from "./common/input";
import Dropdown from "./common/dropdown";
import { getMovies, saveMovie, getMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";

class NewMovie extends Form {
  state = {
    data: { title: "", genreId: "", rate: "", stock: "" },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    rate: Joi.number().min(1).max(10).required(),
    stock: Joi.number().min(0).required(),
  };

  async componentDidMount() {
    let { data: genres } = await getGenres();
    this.setState({ genres });
    const { match } = this.props;
    if (match.path === "/movies/new") {
    } else {
      this.populateInputs(match.params.id);
    }
  }

  doSubmit = async () => {
    const movieId = this.state.data._id;
    try {
      await saveMovie(this.state.data);
      if (movieId) {
        toast.success("Movie Successfully Updated!!");
      } else {
        toast.success("Movie Successfully created!!");
      }
      this.props.history.push("/movies");
    } catch (ex) {
      console.log("In Exception right");
    }
  };
  async populateInputs(movie_id) {
    const { data: movieFound } = await getMovie(movie_id);
    const movie = { ...this.state.data };
    movie._id = movie_id;
    movie.title = movieFound.title;
    movie.rate = movieFound.dailyRentalRate;
    movie.stock = movieFound.numberInStock;
    movie.genreId = movieFound.genre._id;
    this.setState({ data: movie });
  }
  render() {
    const { data, errors, genres } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            label="Title"
            name="title"
            value={data.title}
            error={errors.title}
          />
          <Dropdown
            name="genreId"
            label="Genre"
            value={data.genreId}
            error={errors.genreId}
            onChange={this.handleChange}
            options={genres}
          />
          <Input
            onChange={this.handleChange}
            label="Rate"
            name="rate"
            value={data.rate}
            error={errors.rate}
          />
          <Input
            onChange={this.handleChange}
            label="In Stock"
            name="stock"
            value={data.stock}
            error={errors.stock}
          />
          <button disabled={this.validateError()} className="btn btn-secondary">
            Save Movie
          </button>
        </form>
      </div>
    );
  }
}

export default NewMovie;
