import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiTrash2, FiCheck } from "react-icons/fi";
import api from "../../services/api";

import logo from "../../assets/logo.png";
import "./styles.css";

interface Suggestions {
  id: number;
  image_url: string;
  name: string;
  description: string;
  watched: boolean;
  s_genres: {
    title: string;
  }[];
}

const SuggestionsList: React.FC = () => {
  const [suggestionItems, setSuggestionItems] = useState<Suggestions[]>([]);

  useEffect(() => {
    api.get("suggestion").then((response) => {
      setSuggestionItems(response.data.serializedFinal);
    });
  }, []);

  const handleDeleteSuggestion = async (id: number) => {
    try {
      await api.delete(`suggestion/${id}`);

      setSuggestionItems(
        suggestionItems.filter((suggestionItem) => suggestionItem.id !== id)
      );
    } catch (err) {
      alert("Erro ao deletar a sugestão, tente novamente.");
    }
  };

  const handleAcceptSuggestion = async (id: number) => {
    try {
      await api.put(`suggestion/${id}`);

      setSuggestionItems(
        suggestionItems.filter((suggestionItem) => suggestionItem.id !== id)
      );
    } catch (err) {
      alert("Erro ao deletar a sugestão, tente novamente.");
    }
  };

  return (
    <div id="page-suggestions-list">
      <div className="container">
        <header>
          <img src={logo} alt="Tupã" />
          <Link to="/watched">
            Ir para filmes assistidos
            <FiArrowRight />
          </Link>
        </header>

        <div className="list-movies">
          <h1>Sugestões</h1>
          <ul className="grid-list">
            {suggestionItems.map((suggestionItem) => (
              <li key={suggestionItem.id}>
                <div className="card-image">
                  <img
                    src={suggestionItem.image_url}
                    alt={suggestionItem.name}
                  />
                </div>
                <div className="card-content">
                  <p className="card-title">{suggestionItem.name}</p>
                  <p className="card-description">
                    {suggestionItem.description}
                  </p>
                  <div className="card-info">
                    <p>
                      {suggestionItem.s_genres
                        .map((genre) => genre.title)
                        .join(", ")}
                    </p>
                  </div>
                  <div className="card-buttons">
                    <FiTrash2
                      onClick={() => handleDeleteSuggestion(suggestionItem.id)}
                      size={25}
                      color="#dc2e39"
                    />
                    <FiCheck
                      onClick={() => handleAcceptSuggestion(suggestionItem.id)}
                      size={25}
                      color="#34cb79"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsList;
