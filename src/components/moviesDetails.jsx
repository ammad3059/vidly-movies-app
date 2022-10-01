import React from "react";
class MoviesDetails extends React.Component {
  render() {
    const { match, history } = this.props;
    return (
      <div>
        <h2>Movie ID--{match.params.id}</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            history.push("/movies");
          }}
        >
          save
        </button>
      </div>
    );
  }
}

export default MoviesDetails;
