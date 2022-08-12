import React from "react";
import CloseIcon from "./Icons/CloseIcon";
import { useDispatch } from "react-redux";
import { deleteLane, deleteCard } from "../features/KanbanSlice";
import { useState } from "react";
const card = {
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
};
const CardItem = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};
const cardTitle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};
const cardItems = {
  justifyContent: "center",
  width: "200px",
  height: "75px",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  marginTop: "10px",
  borderRadius: "14px",
  border: "1px solid  white",
  boxShadow: "0px 4px 4px #0000000A",
  paddingLeft: "10px",
};
const description = {
  textAlign: "left",
  fontSize: "14px",
  lineHeight: "24px",
  marginTop: "10px",
  fontWeight: "500",
};
const bug = {
  color: "red",
  marginTop: "-20px",
  marginLeft: "10px",
  fontWeight: "600",
};

const feature = {
  color: "blue",
  marginTop: "-20px",
  marginLeft: "10px",
  fontWeight: "600",
};
const cardType = { padding: "10px", fontSize: "16px", fontWeight: "700" };

const request = {
  color: "green",
  marginTop: "-20px",
  marginLeft: "10px",
  fontWeight: "600",
};

function Card({ data }) {
  const [onMouseHover, setOnMoseHover] = useState(false);
  const [showCloseIcon, setCloseShowIcon] = useState(-1);
  const dispatch = useDispatch();
  const deleteRow = (type) => {
    dispatch(deleteLane({ type }));
  };
  const deleteCardItem = (type, id) => {
    dispatch(deleteCard({ type: type, id: id }));
  };
  const handleTitleMouseEnter = () => {
    setOnMoseHover(true);
  };
  const handleTitleMouseLeave = () => {
    setOnMoseHover(false);
  };
  const handleCardMouseEnter = (id) => {
    setCloseShowIcon(id);
  };
  const handleCardMouseLeave = () => {
    setCloseShowIcon(-1);
  };
  return (
    <div style={card}>
      <div
        style={CardItem}
        onMouseEnter={handleTitleMouseEnter}
        onMouseLeave={handleTitleMouseLeave}
      >
        <text style={cardType}>
          {data.type} ({data.items.length})
        </text>
        {onMouseHover && (
          <div
            style={{ marginTop: "10px" }}
            onClick={() => deleteRow(data.type)}
          >
            <CloseIcon />
          </div>
        )}
      </div>

      <div>
        {data.items?.map((cardItem) => {
          return (
            <div
              onMouseEnter={() => handleCardMouseEnter(cardItem.id)}
              onMouseLeave={() => handleCardMouseLeave(cardItem.id)}
              style={cardItems}
              key={cardItem.id}
            >
              <div style={cardTitle}>
                <div>
                  <div
                    style={{
                      background:
                        cardItem.type === "Bug"
                          ? "red"
                          : cardItem.type === "Feature"
                          ? "blue"
                          : "green",
                      borderRadius: "50%",
                      width: "5px",
                      height: "5px",
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "10px",
                    }}
                  >
                    <div
                      style={
                        cardItem.type === "Bug"
                          ? bug
                          : cardItem.type === "Feature"
                          ? feature
                          : request
                      }
                      id={cardItem.id}
                    >
                      {cardItem.type}
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    marginTop: "-10px",
                    display: showCloseIcon === cardItem.id ? "block" : "none",
                  }}
                  onClick={() => deleteCardItem(data.type, cardItem.id)}
                >
                  <CloseIcon />
                </span>
              </div>
              <div style={description} id={cardItem.id}>
                {cardItem.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
