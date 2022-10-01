const genres = [
  { category: "action", _id: "61702e2932a8693aba3b2fcb" },
  { category: "adventure", _id: "61702e2932a8693aba3b2fcc" },
  { category: "comedy", _id: "61702e2932a8693aba3b2fcd" },
];

export function getGenres() {
  return genres.map((g) => {
    return g.category;
  });
}

export function getFullGenre() {
  return genres;
}
