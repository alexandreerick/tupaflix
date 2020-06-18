import React from "react";
import { FiLogIn, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./styles.css";

import logo from "../../assets/logo.png";

const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="container">
        <header>
          <img src={logo} alt="Tupã" />
          <Link to="/suggestions-list">
            Ver sugestões de filmes
            <FiArrowRight />
          </Link>
        </header>

        <main>
          <h1>Seu cantinho do cinema com os amigos.</h1>
          <p>
            Indique filmes e veja uma lista dos filmes
            <br /> já assistidos.
          </p>

          <Link to="/suggestion">
            <strong>INDICAR FILME</strong>
            <span>
              <FiLogIn />
            </span>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
