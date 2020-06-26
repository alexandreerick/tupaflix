import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiTrash2, FiLoader } from "react-icons/fi";
import api from "../../services/api";

import logo from "../../assets/logo.png";
import "./styles.css";

interface WatchedMovies {
  id: number;
  name: string;
  description: string;
  image_url: string;
  s_genres: {
    title: string;
  }[];
}

const WatchedMovies: React.FC = () => {
  const [watchedMovies, setWatchedMovies] = useState<WatchedMovies[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("watched-movie").then((response) => {
      setLoading(false);
      setWatchedMovies(response.data.serializedFinal);
    });
  }, []);

  const handleDeleteWatched = async (id: number) => {
    try {
      await api.delete(`suggestion/${id}`);

      setWatchedMovies(
        watchedMovies.filter((watchedMovie) => watchedMovie.id !== id)
      );
    } catch (err) {
      alert("Erro ao deletar a sugestão, tente novamente.");
    }
  };

  return (
    <div id="page-watched-movies">
      <div className="container">
        <header>
          <Link to="/">
            <img src={logo} alt="Tupã" />
          </Link>
          <Link to="/suggestions-list">
            <FiArrowLeft />
            Voltar para sugestões
          </Link>
        </header>
      </div>

      <div className="list-movies">
        <h1>Assistidos</h1>
        {loading ? (
          <div className="loading">
            <FiLoader />
          </div>
        ) : (
          <ul className="grid-list">
            {watchedMovies.map((watchedMovie) => (
              <li key={watchedMovie.id}>
                <div className="card-image">
                  <img src={watchedMovie.image_url} alt={watchedMovie.name} />
                </div>
                <div className="card-content">
                  <p className="card-title">{watchedMovie.name}</p>
                  <p className="card-description">{watchedMovie.description}</p>
                  <div className="card-info">
                    <p>
                      {watchedMovie.s_genres
                        .map((genre) => genre.title)
                        .join(", ")}
                    </p>
                  </div>
                  <div className="card-buttons2">
                    <FiTrash2
                      onClick={() => handleDeleteWatched(watchedMovie.id)}
                      size={25}
                      color="#dc2e39"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WatchedMovies;
