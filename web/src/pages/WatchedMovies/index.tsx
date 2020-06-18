import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import logo from "../../assets/logo.png";
import "./styles.css";

const WatchedMovies: React.FC = () => {
  return (
    <div id="page-watched-movies">
      <div className="container">
        <header>
          <img src={logo} alt="Tupã" />
          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <div className="list-movies">
          <h1>Filmes assistidos</h1>
        </div>
      </div>
    </div>
  );
};

export default WatchedMovies;
