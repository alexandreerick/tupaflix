import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import "./styles.css";
import logo from "../../assets/logo.png";

import SuccessMessage from "../../components/SuccesMessage";
import Dropzone from "../../components/Dropzone";

interface Genres {
  id: number;
  name: string;
  image_url: string;
}

const CreateSuggestion: React.FC = () => {
  const [genres, setGenres] = useState<Genres[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number[]>([]);
  const [succesMessage, setSuccessMessage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const submitButton = useRef<HTMLButtonElement>(null);

  const history = useHistory();

  useEffect(() => {
    api.get("/genres").then((response) => {
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
    submitButton.current?.setAttribute("disabled", "disabled");

    const { name, description } = formData;
    const genres = selectedGenre;

    const data = new FormData();

    data.append("name", name);
    data.append("description", description);
    data.append("genres", genres.join(","));

    if (selectedFile) {
      data.append("image", selectedFile);
    }

    await api.post("suggestion", data);

    setSuccessMessage(true);

    setTimeout(() => {
      history.push("/suggestions-list");
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

          <Dropzone onFileUploaded={setSelectedFile} />

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
                required
              />
            </div>

            <div className="field">
              <label htmlFor="description">Breve descrição do filme</label>
              <input
                maxLength={200}
                type="text"
                name="description"
                id="description"
                onChange={handleInputChange}
                required
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

          <button ref={submitButton} type="submit">
            CADASTRAR INDICAÇÃO
          </button>
        </form>
      </div>

      {succesMessage && <SuccessMessage />}
    </>
  );
};

export default CreateSuggestion;
