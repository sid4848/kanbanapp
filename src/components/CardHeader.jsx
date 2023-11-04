import React from "react";
import {
  BsReception4,
  BsPlusLg,
  BsReception3,
  BsReception2,
  BsReception1,
  BsFillExclamationCircleFill,
  BsCircleHalf,
  BsCircleFill,
  BsFillXSquareFill,
} from "react-icons/bs";
import "../css/Dashboard.css";

const priorityIcons = {
  High: <BsReception4 />,
  Medium: <BsReception3 />,
  Low: <BsReception2 />,
  Urgent: <BsFillExclamationCircleFill />,
  "No priority": <BsReception1 />,
  "In progress": <BsCircleHalf />,
  Todo: <BsCircleFill />,
  Backlog: <BsFillXSquareFill />,
};
const CardHeader = ({ element, user, isAvailabel }) => {
  return (
    <div className="dashboard-container_cardHeading">
      <div className="dashboard-container_cardHeading-leftside">
        {!user ? (
          priorityIcons[element.title]
        ) : (
          <>
            <div className="image">
              <img
                src="https://xsgames.co/randomusers/assets/avatars/male/23.jpg"
                alt="Q"
              />
              {isAvailabel ? <div className="status"></div> : <></>}
            </div>
          </>
        )}
        <div className="dashboard-container_cardHeading-leftside_info">
          <p>{element.title}</p>
          <p>{element.value.length}</p>
        </div>
      </div>
      <div className="dashboard-container_cardHeading-rightside">
        <div>...</div>
        <BsPlusLg />
      </div>
    </div>
  );
};

export default CardHeader;
