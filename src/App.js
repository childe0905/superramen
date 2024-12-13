import React, { useState } from "react";
import "./App.css";
import RecommendedRamen from "./RecommendedRamen"; // 引入推薦拉麵子元件
import MrtRamenSystem from "./MrtRamenSystem"; // 引入捷運拉麵系統子元件

function App() {
  const [view, setView] = useState("home"); // 控制顯示內容

  return (
    <div className="App">
      {/* 主畫面選項 */}
      {view === "home" && (
        <>
          <h1 className="title">吃飽飽之拉麵系統</h1>
          <div className="home-options-horizontal">
            <div
              className="option left"
              onClick={() => setView("recommendations")}
            >
              <h2>推薦的拉麵店</h2>
            </div>
            <div
              className="option right"
              onClick={() => setView("mrtRamen")}
            >
              <h2>捷運拉麵系統</h2>
            </div>
          </div>
        </>
      )}

      {/* 推薦的拉麵店畫面 */}
      {view === "recommendations" && (
        <RecommendedRamen onBack={() => setView("home")} />
      )}

      {/* 捷運拉麵系統畫面 */}
      {view === "mrtRamen" && (
        <MrtRamenSystem onBack={() => setView("home")} />
      )}
    </div>
  );
}

export default App;