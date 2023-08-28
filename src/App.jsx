import "./App.css";
import { useEffect, useState, useRef, useMemo } from "react";

function useMovies({ search, sort }) {
  const [listOfMovies, setListOfMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const previousSearchRef = useRef(search);

  const movies = listOfMovies?.Search;

  const mappedMovies = movies?.map((movie) => ({
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
    id: movie.imdbID,
  }));

  // const sortedMovies = sort
  //   ? [...mappedMovies].sort((a, b) => b.title.localeCompare(a.title))
  //   : mappedMovies;

  const fetchMovies = async () => {
    if (previousSearchRef.current === search) return;
    setLoading(true);

    try {
      previousSearchRef.current = search;
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=e1f20ea6&s=${search}`
      );
      const data = await res.json();
      setListOfMovies(data);
    } catch (e) {
      throw new Error("Cant Load Movies");
    } finally {
      setLoading(false);
    }
  };

  const sortedMovies = useMemo(() => {
    return sort
      ? [...mappedMovies].sort((a, b) => b.title.localeCompare(a.title))
      : mappedMovies;
  }, [sort, movies]);

  return { movies: sortedMovies, listOfMovies, fetchMovies, loading };
}

function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const firstInputRef = useRef(true);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current = search === "";
      return;
    }

    //     a. Si el string es vacio
    if (search === "") {
      setError("No se puede buscar una pelicula vacia");
      return;
    }

    // b. Si solo hay numeros (ReGex)
    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con solo numeros");
      return;
    }
    // c. Si es menor a 3 caracteres
    if (search.length < 3) {
      setError("No se puede buscar pelicula menor a 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearch, error };
}

export default function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, listOfMovies, fetchMovies, loading } = useMovies({
    search,
    sort,
  });

  const handleChange = (e) => {
    const newInput = e.target.value;
    setSearch(newInput);
  };

  const handleSubmit = () => {
    fetchMovies();
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="container">
      <h3>Buscador de Peliculas</h3>
      <header>
        <input
          value={search}
          onChange={handleChange}
          type="text"
          placeholder="Avengers, Star Wars, LOTR"
        />
        <input type="checkbox" value={sort} onClick={handleSort} />
        <button onClick={handleSubmit}>Buscar</button>
      </header>
      {error && <p style={{ color: "red" }}> {error}</p>}

      <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return (
    <>
      {hasMovies ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <img src={movie.poster} alt={movie.title} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron resultados</p>
      )}
    </>
  );
}
