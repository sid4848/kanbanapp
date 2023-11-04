import React from "react";
import { useSelector } from "react-redux";
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
import Card from "../components/Card";

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

const Dashboard = () => {
  const { dataSelected, user } = useSelector((state) => state.dataSelectSlice);
  return (
    dataSelected && (
      <div className="dashboard-container">
        {dataSelected?.map((element, index) => {
          return (
            <div key={index}>
              <div key={index} className="dashboard-container_cards ">
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
                <div className="selectList">
                  {element.value?.map((element, ind) => {
                    return (
                      <Card
                        key={ind}
                        id={element.id}
                        title={element.title}
                        tags={element.tag}
                        isAvailabel={element.available}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Dashboard;
