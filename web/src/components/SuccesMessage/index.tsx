import React from "react";
import { FiCheckCircle } from "react-icons/fi";

import "./styles.css";

const SuccesMessage: React.FC = () => {
  return (
    <div className="container-message">
      <FiCheckCircle />
      <h1>Sugestão cadastrada!</h1>
    </div>
  );
};

export default SuccesMessage;
