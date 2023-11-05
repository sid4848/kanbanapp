import React from "react";
import { BsFillChatLeftFill } from "react-icons/bs";
import "../css/Card.css";

const Card = ({ id, title, tags, isAvailabel }) => {
  return (
    <div className="cards-container">
      <div className="cardHeader" style={{ justifyContent: "space-between" }}>
        <span>{id}</span>

        {isAvailabel === undefined ? (
          <div className="image">
            <img
              src="https://xsgames.co/randomusers/assets/avatars/male/23.jpg"
              alt="Q"
            />
            {isAvailabel ? <div className="status"></div> : <></>}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="cardBody">
        <p>{title}</p>
      </div>

      <div className="cardFooter">
        <div>
          <h3>. . .</h3>
        </div>
        {tags?.map((element, index) => {
          return (
            <div key={index} className="cardTag">
              <div>
                <BsFillChatLeftFill />
              </div>
              <p>{element}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
