import React, { useEffect } from "react";
import "../css/styleAchievement.css";

export default function Achievement() {
  let json = require("./achieveMents.json");
  let container = document.getElementById("container");

  useEffect(() => {
    renderAdder();
  }, [renderAdder]);

  function renderAdder() {
    console.log(json);

    return (
      <>
        {json.map((ele, i) => (
          <div className="achievementSection">
            <div>{ele.title}</div>
            <div>{ele.body}</div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="achievement">
        <div className="achievementContainer" id="container">
          <h1>Achievements</h1>
          <div>{renderAdder()}</div>
        </div>
      </div>
    </>
  );
}
