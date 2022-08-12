import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { insertCard } from "../../features/KanbanSlice";
import CloseIcon from "../Icons/CloseIcon";
import { useSelector } from "react-redux";
import "../../global.css";
const create = {
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

const selectStatus = {
  width: "130px",
  display: "flex",
  marginTop: "10px",
  justifyContent: "center",
};
const statusTitle = {
  display: "flex",
  flexDirection: "column",
  marginTop: "10px",
  justifyContent: "center",
  alignItems: "center",
  width: "100px",
};
const description = {
  display: "flex",
  flexDirection: "column",
  marginTop: "5px",
  justifyContent: "center",
  alignItems: "center",
};

const inputTitle = {
  width: "50%",
  display: "flex",
  marginTop: "10px",
  justifyContent: "center",
};

const types = {
  display: "flex",
  flexDirection: "column",
  marginTop: "5px",
  justifyContent: "center",
  alignItems: "center",
  width: "100px",
};
const statusSelect = {
  width: "130px",
  display: "flex",
  marginTop: "5px",
  justifyContent: "center",
};
function CreateCardItem({ isCardOpen, onClose, setIsCardOpen }) {
  const [title, setTitle] = useState("");
  const Data = useSelector((state) => state.board.laneList);
  const [status, setStatus] = useState(Data.map((data) => data.type));
  const [type, setType] = useState("Select");
  const [currentStatus, setCurrentStatus] = useState("Select");
  const Types = ["Bug", "Feature", "Request"];

  useEffect(() => {
    setStatus(Data.map((data) => data.type));
  }, [Data]);
  const dispatch = useDispatch();
  const closeModal = () => {
    setIsCardOpen(false);
    setCurrentStatus("Select");
    setType("Select");
    setTitle("");
  };
  const createCardItem = () => {
    if (title.length > 0 && currentStatus !== "Select" && type !== "Select") {
      let id = Math.floor(Math.random() * 100) + 1;
      dispatch(
        insertCard({
          type: currentStatus,
          item: { description: title, id: id, type: type },
        })
      );
      setIsCardOpen(false);
      setCurrentStatus("Select");
      setType("Select");
      setTitle("");
    }
  };
  const changeHandler = (e) => {
    setTitle(e.target.value);
  };
  const onChangeHandler = (e) => {
    setType(e.target.value);
  };
  const onChangeStatusHandler = (e) => {
    setCurrentStatus(e.target.value);
  };
  if (!isCardOpen) return null;
  return ReactDOM.createPortal(
    <>
      <div className="modaloverlay">
        <div className="modalContent">
          <div>
            <div style={{ alignItems: "right" }} onClick={closeModal}>
              <CloseIcon />
            </div>
            <div style={{ textAlign: "center" }}>Create New Card</div>
            <div style={description}>
              <label style={{ display: "flex", justifyContent: "left" }}>
                Description
              </label>
              <textarea
                style={inputTitle}
                onChange={changeHandler}
                value={title}
              ></textarea>
              <div style={types}>
                <label>Type</label>
                <select style={statusSelect} onChange={onChangeHandler}>
                  <option>Select</option>
                  {Types.map((type) => (
                    <option>{type}</option>
                  ))}
                </select>
              </div>

              <div style={statusTitle}>
                <label>Status</label>
                <select style={selectStatus} onChange={onChangeStatusHandler}>
                  <option>Select</option>
                  {status.map((status) => (
                    <option>{status}</option>
                  ))}
                </select>
              </div>
              <button
                style={create}
                disabled={
                  !(
                    title.length > 0 &&
                    currentStatus !== "Select" &&
                    type !== "Select"
                  )
                }
                onClick={createCardItem}
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

export { CreateCardItem };
