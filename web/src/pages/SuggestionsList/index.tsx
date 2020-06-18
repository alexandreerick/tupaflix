import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiTrash2, FiCheck } from "react-icons/fi";

import logo from "../../assets/logo.png";
import "./styles.css";

import poster from "../../tmp/batman-poster.jpg";

const SuggestionsList: React.FC = () => {
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
            <li>
              <div className="card-image">
                <img src={poster} alt="Batman" />
              </div>
              <div className="card-content">
                <p className="card-title">Batman: O Cavaleiro das Trevas</p>
                <div className="card-info">
                  <p>Ação, Suspense</p>
                </div>
                <div className="card-buttons">
                  <FiTrash2 size={25} color="#dc2e39" />
                  <FiCheck size={25} color="#34cb79" />
                </div>
              </div>
            </li>

            <li>
              <div className="card-image">
                <img src={poster} alt="Batman" />
              </div>
              <div className="card-content">
                <p className="card-title">Batman: O Cavaleiro das Trevas</p>
                <div className="card-info">
                  <p>Ação, Suspense</p>
                </div>
                <div className="card-buttons">
                  <FiTrash2 size={25} color="#dc2e39" />
                  <FiCheck size={25} color="#34cb79" />
                </div>
              </div>
            </li>

            <li>
              <div className="card-image">
                <img src={poster} alt="Batman" />
              </div>
              <div className="card-content">
                <p className="card-title">Batman: O Cavaleiro das Trevas</p>
                <div className="card-info">
                  <p>Ação, Suspense</p>
                </div>
                <div className="card-buttons">
                  <FiTrash2 size={25} color="#dc2e39" />
                  <FiCheck size={25} color="#34cb79" />
                </div>
              </div>
            </li>

            <li>
              <div className="card-image">
                <img src={poster} alt="Batman" />
              </div>
              <div className="card-content">
                <p className="card-title">Batman: O Cavaleiro das Trevas</p>
                <div className="card-info">
                  <p>Ação, Suspense</p>
                </div>
                <div className="card-buttons">
                  <FiTrash2 size={25} color="#dc2e39" />
                  <FiCheck size={25} color="#34cb79" />
                </div>
              </div>
            </li>

            <li>
              <div className="card-image">
                <img src={poster} alt="Batman" />
              </div>
              <div className="card-content">
                <p className="card-title">Batman: O Cavaleiro das Trevas</p>
                <div className="card-info">
                  <p>Ação, Suspense</p>
                </div>
                <div className="card-buttons">
                  <FiTrash2 size={25} color="#dc2e39" />
                  <FiCheck size={25} color="#34cb79" />
                </div>
              </div>
            </li>

            <li>
              <div className="card-image">
                <img src={poster} alt="Batman" />
              </div>
              <div className="card-content">
                <p className="card-title">Batman: O Cavaleiro das Trevas</p>
                <div className="card-info">
                  <p>Ação, Suspense</p>
                </div>
                <div className="card-buttons">
                  <FiTrash2 size={25} color="#dc2e39" />
                  <FiCheck size={25} color="#34cb79" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsList;
