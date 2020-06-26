import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import "./styles.css";

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const maxSize = 1048576;
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const {
    getRootProps,
    getInputProps,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: ".jpg, .png, .jpeg",
    minSize: 0,
    maxSize: 1048576,
  });

  const isFileTooLarge =
    fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} required />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="ImageDropzone" />
      ) : (
        <p>
          <FiUpload />
          Imagem/Poster do filme
          {isDragReject && " / Tipo de arquivo inválido"}
          {isFileTooLarge && " / Arquivo muito grande!"}
        </p>
      )}
    </div>
  );
};

export default Dropzone;
