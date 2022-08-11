import React from "react";
import Card from "./Card";
import { useState } from "react";
import Modal from "./Modal/Modal";
import { CreateCardItem } from "./Modal/CreateCardItem";
import { useSelector } from "react-redux";
const buttons = {
  display: "flex",
  marginTop: "10px",
  justifyContent: "center",
  boxShadow: "0px 4px 8px #0000001F",
  backgroundColor: "white",
  border: "1px solid white",
  borderRadius: "8px",
  height: "25px",
  width: "130px",
  fontWeight: "900",
};
function Board() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const Data = useSelector((state) => state.board.laneList);
  const createNewLane = () => {
    setIsOpen(true);
  };

  const createNewCard = () => {
    setIsCardOpen(true);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {Data.map((data) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Card key={data.type} data={data} />
            </div>
          );
        })}
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "10px", marginLeft: "10px" }}>
            <button style={buttons} onClick={createNewLane}>
              Create Lane
            </button>
          </div>

          <div style={{ marginTop: "10px", marginLeft: "10px" }}>
            <button style={buttons} onClick={createNewCard}>
              Create card
            </button>
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClose={() => setIsOpen(false)}
        />
        <CreateCardItem
          isCardOpen={isCardOpen}
          setIsCardOpen={setIsCardOpen}
          onClose={() => setIsCardOpen(false)}
        />
      </div>
    </>
  );
}

export default Board;
