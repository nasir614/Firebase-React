import React, { useEffect } from "react";
import "./FileCard.css";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { db, storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";

const FileCard = ({ id, name, url, getFiles }) => {
  const handleDelete = (name, id) => {
    const desertRef = ref(storage, "files/" + name);
    deleteDoc(doc(db, "myFiles", id));
    deleteObject(desertRef)
      .then((del) => {
        console.log("deleted file");

        getFiles();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    console.log(name);
  });
  return (
    <div className="fileCard">
      <a href={url} target="_blank" rel="noreferrer" download>
        <div className="fileCard--top">
          <InsertDriveFileIcon style={{ fontSize: 130, color: "gray" }} />
        </div>
      </a>
      <div className="fileCard--bottom">
        <p>{name}</p>
        <DeleteForeverIcon
          className="todo__delete"
          onClick={() => handleDelete(name, id)}
        />
      </div>
    </div>
  );
};

export default FileCard;
