import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLane } from "../../features/KanbanSlice";
import CloseIcon from "../Icons/CloseIcon";
import "../../global.css";

const button = {
  width: "55%",
  display: "flex",
  marginTop: "10px",
  justifyContent: "center",
  boxShadow: "0px 4px 8px #0000001F",
  backgroundColor: "white",
  border: "1px solid white",
  borderRadius: "8px",
  height: "20px",
};
const titles = {
  display: "flex",
  flexDirection: "column",
  marginTop: "50px",
  justifyContent: "center",
  alignItems: "center",
};
const input = {
  width: "50%",
  display: "flex",
  marginTop: "10px",
  justifyContent: "center",
};
const titleLabel = { display: "flex", justifyContent: "left" };
function Modal({ isOpen, setIsOpen }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const closeModal = () => {
    setIsOpen(false);
  };
  const CreateLane = () => {
    if (title.length > 0) {
      dispatch(addLane({ type: title, items: [] }));
      setIsOpen(false);
      setTitle("");
    }
  };
  const changeHandler = (e) => {
    setTitle(e.target.value);
  };
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <div className="modaloverlay">
        <div className="modalContent">
          <div>
            <div style={{ alignItems: "right" }} onClick={closeModal}>
              <CloseIcon />
            </div>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              Create New Lane
            </div>
            <div style={titles}>
              <label style={titleLabel}>Title</label>
              <input
                style={input}
                onChange={changeHandler}
                value={title}
              ></input>
              <button
                style={button}
                disabled={!title.length}
                onClick={CreateLane}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
