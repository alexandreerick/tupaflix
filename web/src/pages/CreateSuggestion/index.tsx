import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import "./styles.css";
import logo from "../../assets/logo.png";

import SuccessMessage from "../../components/SuccesMessage";

interface Genres {
  id: number;
  name: string;
  image_url: string;
}

const CreateSuggestion: React.FC = () => {
  const [genres, setGenres] = useState<Genres[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number[]>([]);
  const [succesMessage, setSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const history = useHistory();

  useEffect(() => {
    api.get("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  const handleSelectedGenre = (id: number) => {
    const alreadySelected = selectedGenre.findIndex((genre) => genre === id);

    if (alreadySelected >= 0) {
      const filteredGenres = selectedGenre.filter((genre) => genre !== id);

      setSelectedGenre(filteredGenres);
    } else {
      setSelectedGenre([...selectedGenre, id]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { name, description } = formData;
    const genres = selectedGenre;

    const data = {
      name,
      description,
      genres,
    };

    await api.post("suggestion", data);

    setSuccessMessage(true);

    setTimeout(() => {
      history.push("/");
    }, 3000);
  };

  return (
    <>
      <div id="page-create-suggestion">
        <header>
          <img src={logo} alt="Tupã" />
          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <form onSubmit={handleSubmit}>
          <h1>Indique um filme</h1>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <div className="field">
              <label htmlFor="name">Nome do filme</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="description">Breve descrição do filme</label>
              <input
                maxLength={75}
                type="text"
                name="description"
                id="description"
                onChange={handleInputChange}
              ></input>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Gêneros</h2>
              <span>Selecione um ou mais gêneros abaixo</span>
            </legend>

            <ul className="items-grid">
              {genres.map((genre) => (
                <li
                  key={genre.id}
                  onClick={() => handleSelectedGenre(genre.id)}
                  className={selectedGenre.includes(genre.id) ? "selected" : ""}
                >
                  <img src={genre.image_url} alt={genre.name} />
                  <span>{genre.name}</span>
                </li>
              ))}
            </ul>
          </fieldset>

          <button>CADASTRAR INDICAÇÃO</button>
        </form>
      </div>

      {succesMessage && <SuccessMessage />}
    </>
  );
};

export default CreateSuggestion;
