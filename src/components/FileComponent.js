import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import "./FileComponent.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%,-50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Filecomponent = ({ getFiles }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    setUploading(true);
    const storageRef = ref(storage, "files/" + file.name);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded file!");
        getDownloadURL(storageRef).then((url) => {
          addDoc(collection(db, "myFiles"), {
            timestamp: serverTimestamp(),
            caption: file.name,
            size: file.size,
            url: url,
          });
          getFiles();
        });

        console.log("added file");
      })
      .catch((err) => console.log(err));

    setUploading(false);
    setOpen(false);
    setFile(null);
  };
  return (
    <div className="file">
      <div className="file__container" onClick={handleOpen}>
        <AddIcon fontSize="large" />
        <p>New</p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <p>Select files you want to upload!</p>
          {uploading ? (
            <p>Uploading...</p>
          ) : (
            <>
              <input type="file" onChange={handleChange} />
              <button onClick={handleUpload}>Upload</button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Filecomponent;
