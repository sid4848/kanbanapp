import React from "react";
import { useSelector } from "react-redux";
import "../css/Dashboard.css";
import Card from "../components/Card";
import CardHeader from "./CardHeader";

const Dashboard = () => {
  const { dataSelected, user } = useSelector((state) => state.dataSelectSlice);
  return (
    dataSelected && (
      <div className="dashboard-container">
        {dataSelected?.map((data, index) => {
          return (
            <div key={index}>
              <div key={index} className="dashboard-container_cards ">
                <CardHeader
                  element={data}
                  user={user}
                  isAvailabel={data.available}
                />
                <div className="selectList">
                  {data.value?.map((element, index) => {
                    return (
                      <Card
                        key={index}
                        id={element.id}
                        title={element.title}
                        tags={element.tag}
                        isAvailabel={data?.available}
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
