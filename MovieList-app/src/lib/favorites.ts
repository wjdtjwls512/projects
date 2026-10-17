export interface SavedMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}
const key = "cinefile:favorites";
export const getFavorites = (): SavedMovie[] => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};
export const isFavorite = (id: number) =>
  getFavorites().some((movie) => movie.id === id);
export const toggleFavorite = (movie: SavedMovie) => {
  const favorites = getFavorites();
  const exists = favorites.some((item) => item.id === movie.id);
  localStorage.setItem(
    key,
    JSON.stringify(
      exists
        ? favorites.filter((item) => item.id !== movie.id)
        : [movie, ...favorites],
    ),
  );
  return !exists;
};
