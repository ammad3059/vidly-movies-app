import _ from "lodash";

export function paginate(movies, pageNumber, moviesToDisplay) {
  const startIndex = (pageNumber - 1) * moviesToDisplay;
  return _(movies).slice(startIndex).take(moviesToDisplay).value();
}
