import axios from "axios";
import { useEffect } from "react";
import Chip from "@material-ui/core/Chip";

const Genre = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => {
          return (
            <Chip
              label={genre.name}
              size="small"
              color="primary"
              key={genre.id}
              style={{ margin: 2 }}
              clickable
              on
              onDelete={() => handleRemove(genre)}
            />
          );
        })}
      {genres &&
        genres.map((genre) => {
          return (
            <Chip
              label={genre.name}
              size="small"
              key={genre.id}
              style={{ margin: 2 }}
              clickable
              onClick={() => handleAdd(genre)}
            />
          );
        })}
    </div>
  );
};

export default Genre;
