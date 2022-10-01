import React from "react";
import Like from "./common/like";
import { deleteMovie } from "../services/fakemovies";
import { Link } from "react-router-dom";

const MoviesTable = (props) => {
  const { moviesList, onDelete, onLike, onSort, renderIcon, user } = props;
  return (
    <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th
              onClick={() => {
                onSort("title");
              }}
              scope="col"
            >
              Movie {renderIcon("title")}
            </th>
            <th
              onClick={() => {
                onSort("genre.name");
              }}
              scope="col"
            >
              Genre {renderIcon("genre.name")}
            </th>
            <th
              onClick={() => {
                onSort("numberInStock");
              }}
              scope="col"
            >
              In Stock {renderIcon("numberInStock")}
            </th>
            <th
              onClick={() => {
                onSort("dailyRentalRate");
              }}
              scope="col"
            >
              Price {renderIcon("dailyRentalRate")}
            </th>
            <th>Like</th>
            {user && <th scope="col">Delete</th>}
          </tr>
        </thead>
        <tbody>
          {moviesList.map((movie) => {
            return (
              <tr key={movie._id}>
                <th scope="row">
                  <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                </th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => onLike(movie)}
                  ></Like>
                </td>
                {user && (
                  <td>
                    <button
                      onClick={() => {
                        onDelete(movie._id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default MoviesTable;
