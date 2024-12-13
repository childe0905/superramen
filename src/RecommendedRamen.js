import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // 引入星形圖標
import "./App.css"; // 新增排版 CSS
const recommendedRamenStores = [
    { name: "一風堂", location: "台北市信義區", link: "https://www.google.com/maps/search/?api=1&query=一風堂+台北", rating: 4.5, tags: ["豚骨", "味噌", "連鎖"] },
    { name: "麵屋一燈", location: "台北市中山區", link: "https://www.google.com/maps/search/?api=1&query=麵屋一燈+台北", rating: 4.0, tags: ["雞白湯", "創意", "人氣"] },
    { name: "拉麵公子", location: "台北市大安區", link: "https://www.google.com/maps/search/?api=1&query=拉麵公子+台北", rating: 3.5, tags: ["豚骨", "濃厚", "日式"] },
    { name: "山頭火", location: "台北市車站區", link: "https://www.google.com/maps/search/?api=1&query=山頭火+台北", rating: 4.2, tags: ["鹽味", "拉麵", "人氣"] },
    { name: "花月嵐", location: "台北市松山區", link: "https://www.google.com/maps/search/?api=1&query=花月嵐+台北", rating: 3.8, tags: ["醬油", "濃厚", "連鎖"] },
    { name: "極匠", location: "台北市公館區", link: "https://www.google.com/maps/search/?api=1&query=極匠+台北", rating: 4.7, tags: ["魚介", "創意", "高評價"] },
    { name: "麵屋千雲", location: "台北市信義區", link: "https://www.google.com/maps/search/?api=1&query=麵屋千雲+台北", rating: 4.3, tags: ["雞湯", "清淡", "人氣"] },
    { name: "鬼金棒", location: "台北市中山區", link: "https://www.google.com/maps/search/?api=1&query=鬼金棒+台北", rating: 4.1, tags: ["辛辣", "濃厚", "日式"] },
    { name: "麵屋武藏", location: "台北市中正區", link: "https://www.google.com/maps/search/?api=1&query=麵屋武藏+台北", rating: 4.0, tags: ["豚骨", "醬油", "創意"] },
    { name: "初原麵場", location: "台北市板橋區", link: "https://www.google.com/maps/search/?api=1&query=初原麵場+台北", rating: 3.9, tags: ["清湯", "創意", "在地"] },
  ];

// 生成星星
const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // 整數星
    const hasHalfStar = rating % 1 !== 0; // 是否有半星
    const emptyStars = 5 - Math.ceil(rating); // 剩餘空星數
  
    return (
      <div className="stars">
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <FaStar key={`full-${index}`} className="star full" />
          ))}
        {hasHalfStar && <FaStarHalfAlt className="star half" />}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <FaRegStar key={`empty-${index}`} className="star empty" />
          ))}
      </div>
    );
  };

  function RecommendedRamen({ onBack }) {
    return (
      <div className="recommendations">
        <h1>TOP 10 推薦的拉麵店</h1>
        <div className="ramen-rankings">
          {recommendedRamenStores.map((store, index) => (
            <div key={index} className="ranking-item">
              <span className="ranking-number">{index + 1}</span>
              <div className="ranking-details">
                <strong>{store.name}</strong> - {store.location}
                <br />
                <a href={store.link} target="_blank" rel="noopener noreferrer">
                  查看地圖
                </a>
                <div className="tags">
                  {store.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="rating">
                  {renderStars(store.rating)} {/* 顯示星星 */}
                </div>
              </div>
              <div className="ranking-image">
                {/* 添加圖片 */}
                <img
                  src={`images/ramen${index + 1}.jpg`} // 根據順序命名的圖片路徑
                  alt={store.name}
                  className="ramen-image"
                />
              </div>
            </div>
          ))}
        </div>
        <button onClick={onBack} className="back-button">
          回到主畫面
        </button>
      </div>
    );
  }
  
  export default RecommendedRamen;