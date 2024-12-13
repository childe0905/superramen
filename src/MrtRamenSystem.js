import React, { useState, useEffect } from "react";
import "./App.css";
import mrtMap from "./assets/000.jpg"; // 引入捷運地圖圖片
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

  
// 捷運站清單（可擴充）
const mrtStations = [
    { name: "淡水", top: "9%", left: "4%" },
    { name: "竹圍", top: "9%", left: "14%" },
    { name: "紅樹林", top: "9%", left: "9%" },
    { name: "關渡", top: "9%", left: "18.3%" },
    { name: "忠義", top: "9%", left: "23%" },
    { name: "復興崗", top: "9%", left: "28%" },
    { name: "北投", top: "9%", left: "33%" },
    { name: "新北投", top: "4%", left: "32.5%" },
    { name: "奇岩", top: "9%", left: "38%" },
    { name: "唭哩岸", top: "11%", left: "42%" },
    { name: "石牌", top: "15%", left: "42%" },
    { name: "明德", top: "19%", left: "42%" },
    { name: "芝山", top: "23%", left: "42%" },
    { name: "士林", top: "27%", left: "42%" },
    { name: "劍潭", top: "31%", left: "42%" },
    { name: "圓山", top: "35%", left: "42%" },
    { name: "民權西路", top: "40%", left: "39.5%" },
    { name: "雙連", top: "44%", left: "39.5%" },
    { name: "中山", top: "50%", left: "39.2%" },
    { name: "台北車站", top: "58.5%", left: "37%" },
    { name: "台大醫院", top: "64%", left: "39.2%" },
    { name: "中正紀念堂", top: "68%", left: "39.2%" },
    { name: "東門", top: "68%", left: "47%" },
    { name: "大安森林公園", top: "65%", left: "51%" },
    { name: "大安", top: "68%", left: "55.5%" },
    { name: "信義安和", top: "68%", left: "64%" },
    { name: "台北101", top: "68%", left: "72%" },
    { name: "象山", top: "68%", left: "78%" },
  
    { name: "科技大樓", top: "73.5%", left: "55%" },
    { name: "六張犁", top: "79%", left: "55%" },
    { name: "麟光", top: "85%", left: "57%" },
    { name: "辛亥", top: "86%", left: "62.5%" },
    { name: "萬芳醫院", top: "86%", left: "68%" },
    { name: "萬芳社區", top: "86%", left: "75%" },
    { name: "木柵", top: "86%", left: "81%" },
    { name: "動物園", top: "86%", left: "86.2%" },
  
  
    { name: "古亭", top: "73%", left: "43%" },
    { name: "台電大樓", top: "75%", left: "46.5%" },
    { name: "公館", top: "78%", left: "48%" },
    { name: "萬隆", top: "81%", left: "48%" },
    { name: "景美", top: "84.6%", left: "48%" },
    { name: "大坪林", top: "88.2%", left: "48%" },
    { name: "七張", top: "92.1%", left: "48%" },
    { name: "小碧潭", top: "93.2%", left: "43%" },
    { name: "新店區公所", top: "95.5%", left: "48%" },
    { name: "新店", top: "98.7%", left: "48%" },
  
    { name: "南港展覽館", top: "61%", left: "90%" },
    { name: "南港", top: "56.5%", left: "85.8%" },
    { name: "昆陽", top: "61%", left: "82%" },
    { name: "後山埤", top: "56.5%", left: "78%" },
    { name: "永春", top: "61%", left: "74.4%" },
    { name: "市政府", top: "56.5%", left: "70.6%" },
    { name: "國父紀念館", top: "61%", left: "66%" },
    { name: "忠孝敦化", top: "56.5%", left: "61.5%" },
    { name: "忠孝復興", top: "58.5%", left: "55.35%" },
    { name: "忠孝新生", top: "58.5%", left: "48%" },
    { name: "善導寺", top: "56%", left: "42.5%" },
  
  
    { name: "松山", top: "50%", left: "79%" },
    { name: "南京三民", top: "50%", left: "72.3%" },
    { name: "台北小巨蛋", top: "50%", left: "63%" },
    { name: "南京復興", top: "50%", left: "55%" },
    { name: "松江南京", top: "50%", left: "47%" },
  
    { name: "南港軟體園區", top: "52%", left: "90%" },
    { name: "東湖", top: "46.4%", left: "90%" },
    { name: "葫洲", top: "41.3%", left: "90%" },
    { name: "大湖公園", top: "36%", left: "90%" },
    { name: "內湖", top: "33%", left: "86%" },
    { name: "文德", top: "33%", left: "80.5%" },
    { name: "港墘", top: "33%", left: "75%" },
    { name: "西湖", top: "33%", left: "69.6%" },
    { name: "劍南路", top: "33%", left: "64%" },
    { name: "大直", top: "33%", left: "58.5%" },
    { name: "松山機場", top: "37.4%", left: "55.5%" },
    { name: "中山國中", top: "43%", left: "55.5%" },
  
    { name: "北門", top: "49%", left: "33%" },
    { name: "西門", top: "58.3%", left: "30.5%" },
    { name: "小南門", top: "67.5%", left: "31.5%" },
  
    { name: "頂溪", top: "77%", left: "39.5%" },
    { name: "永安市場", top: "81.5%", left: "36%" },
    { name: "景安", top: "85.5%", left: "33%" },
    { name: "南勢角", top: "89%", left: "30%" },
  
    { name: "中山國小", top: "39%", left: "47.2%" },
    { name: "行天宮", top: "43.8%", left: "47.2%" },
  
    { name: "大橋頭", top: "40%", left: "32.5%" },
    { name: "三重國小", top: "36%", left: "28.5%" },
    { name: "三和國中", top: "32%", left: "24.5%" },
    { name: "徐匯中學", top: "28%", left: "21%" },
    { name: "三民高中", top: "24%", left: "18%" },
    { name: "蘆洲", top: "19%", left: "14.5%" },
  
    { name: "台北橋", top: "44%", left: "28%" },
    { name: "菜寮", top: "47%", left: "25%" },
    { name: "三重", top: "51%", left: "22%" },
    { name: "先嗇宮", top: "55%", left: "19%" },
    { name: "頭前庄", top: "59%", left: "16%" },
    { name: "新莊", top: "62%", left: "13%" },
    { name: "輔大", top: "66%", left: "10.5%" },
    { name: "丹鳳", top: "70%", left: "7%" },
    { name: "回籠", top: "73%", left: "4%" },

    { name: "龍山寺", top: "59%", left: "26%" },
    { name: "江子翠", top: "62%", left: "24%" },
    { name: "新埔", top: "65%", left: "22%" },
    { name: "板橋", top: "68%", left: "20%" },
    { name: "府中", top: "71%", left: "17.8%" },
    { name: "亞東醫院", top: "74%", left: "15%" },
    { name: "海山", top: "77%", left: "12.7%" },
    { name: "土城", top: "80%", left: "10.5%" },
    { name: "永寧", top: "82.8%", left: "8%" },
    { name: "頂埔", top: "86%", left: "6%" },
  // 可在此補充完整捷運站清單與座標
];

// 假資料：拉麵店清單
const ramenStores = {
   
    

//以下為綠線


    "北門": [
      {
        "name": "旨燕",
        "link": "https://maps.app.goo.gl/fZNMufaChNXKwUXU6",
        "rating": 4.5
      },
      {
        "name": "豚人拉麵",
        "link": "https://maps.app.goo.gl/jFyTZY7NWTFAY6ES8",
        "rating": 4.3
      }
    ],
    "古亭˙": [
      {
        "name": "一階堂拉麵",
        "link": "https://maps.app.goo.gl/jtRR9NXnkqjiouySA",
        "rating": 4.4
      }
    ],
    "新店區公所": [
      {
        "name": "麵屋十方",
        "link": "https://maps.app.goo.gl/PrGvfPgThTRa3HCp9",
        "rating": 4.6
      }
    ],

"松山": [
    { name: "屋台秀吉", link: "https://www.google.com/maps/search/?api=1&query=屋台秀吉+松山", rating: 4.2 },
    { name: "花月嵐", link: "https://www.google.com/maps/search/?api=1&query=花月嵐+松山", rating: 4.0 }
  ],
  "南京三民": [
    { name: "大間拉麵", link: "https://www.google.com/maps/search/?api=1&query=大間拉麵+南京三民", rating: 4.5 },
    { name: "十一巷拉麵", link: "https://www.google.com/maps/search/?api=1&query=十一巷拉麵+南京三民", rating: 4.3 },
    { name: "長生塩人", link: "https://www.google.com/maps/search/?api=1&query=長生塩人+南京三民", rating: 4.1 },
    { name: "九湯屋", link: "https://www.google.com/maps/search/?api=1&query=九湯屋+南京三民", rating: 4.0 }
  ],
  "台北小巨蛋": [
    { name: "麵屋和創", link: "https://www.google.com/maps/search/?api=1&query=麵屋和創+台北小巨蛋", rating: 4.4 },
    { name: "麵試十一次", link: "https://www.google.com/maps/search/?api=1&query=麵試十一次+台北小巨蛋", rating: 4.3 },
    { name: "大石家", link: "https://www.google.com/maps/search/?api=1&query=大石家+台北小巨蛋", rating: 4.2 },
    { name: "一騎中華拉麵", link: "https://www.google.com/maps/search/?api=1&query=一騎中華拉麵+台北小巨蛋", rating: 4.1 }
  ],
  "南京復興": [
    { name: "拉麵公子", link: "https://www.google.com/maps/search/?api=1&query=拉麵公子+南京復興", rating: 4.5 },
    { name: "三友", link: "https://www.google.com/maps/search/?api=1&query=三友+南京復興", rating: 4.2 },
    { name: "鄞家食堂", link: "https://www.google.com/maps/search/?api=1&query=鄞家食堂+南京復興", rating: 4.0 },
    { name: "博多幸龍", link: "https://www.google.com/maps/search/?api=1&query=博多幸龍+南京復興", rating: 4.3 },
    { name: "樂町屋", link: "https://www.google.com/maps/search/?api=1&query=樂町屋+南京復興", rating: 4.1 }
  ],
  "中山": [
    { name: "麵屋一燈", link: "https://www.google.com/maps/search/?api=1&query=麵屋一燈+中山", rating: 4.6 },
    { name: "麵屋千雲", link: "https://www.google.com/maps/search/?api=1&query=麵屋千雲+中山", rating: 4.4 },
    { name: "鬼金棒", link: "https://www.google.com/maps/search/?api=1&query=鬼金棒+中山", rating: 4.3 },
    { name: "大和家", link: "https://www.google.com/maps/search/?api=1&query=大和家+中山", rating: 4.0 },
    { name: "美濃屋", link: "https://www.google.com/maps/search/?api=1&query=美濃屋+中山", rating: 3.8 },
    { name: "蘭丸", link: "https://www.google.com/maps/search/?api=1&query=蘭丸+中山", rating: 4.2 },
    { name: "小糧倉", link: "https://www.google.com/maps/search/?api=1&query=小糧倉+中山", rating: 4.0 },
    { name: "京都柚子豚骨拉麵研究中心", link: "https://www.google.com/maps/search/?api=1&query=京都柚子豚骨拉麵研究中心+中山", rating: 4.5 }
  ],
  "小南門": [
    { name: "三元堂", link: "https://www.google.com/maps/search/?api=1&query=三元堂+小南門", rating: 4.0 },
    { name: "重熙老麵", link: "https://www.google.com/maps/search/?api=1&query=重熙老麵+小南門", rating: 4.1 },
    { name: "花月嵐", link: "https://www.google.com/maps/search/?api=1&query=花月嵐+小南門", rating: 3.9 }
  ],
  "中正紀念堂": [
    { name: "初拉麵&煎餃", link: "https://www.google.com/maps/search/?api=1&query=初拉麵&煎餃+中正紀念堂", rating: 4.2 },
    { name: "鬼匠貳拉麵", link: "https://www.google.com/maps/search/?api=1&query=鬼匠貳拉麵+中正紀念堂", rating: 4.0 }
  ],
  "台電大樓": [
    { name: "京都柚子豚骨拉麵研究中心", link: "https://www.google.com/maps/search/?api=1&query=京都柚子豚骨拉麵研究中心+台電大樓", rating: 4.6 },
    { name: "麵屋舜水蟬", link: "https://www.google.com/maps/search/?api=1&query=麵屋舜水蟬+台電大樓", rating: 4.4 },
    { name: "數寄屋", link: "https://www.google.com/maps/search/?api=1&query=數寄屋+台電大樓", rating: 4.1 },
    { name: "真劍", link: "https://www.google.com/maps/search/?api=1&query=真劍+台電大樓", rating: 4.0 }
  ],
  "公館": [
    { name: "極匠", link: "https://www.google.com/maps/search/?api=1&query=極匠+公館", rating: 4.8 },
    { name: "墨洋", link: "https://www.google.com/maps/search/?api=1&query=墨洋+公館", rating: 4.5 },
    { name: "吉天元", link: "https://www.google.com/maps/search/?api=1&query=吉天元+公館", rating: 4.3 },
    { name: "山嵐", link: "https://www.google.com/maps/search/?api=1&query=山嵐+公館", rating: 4.4 },
    { name: "力量拉麵", link: "https://www.google.com/maps/search/?api=1&query=力量拉麵+公館", rating: 4.2 },
    { name: "隱家拉麵", link: "https://www.google.com/maps/search/?api=1&query=隱家拉麵+公館", rating: 4.0 }
  ],
  "景美": [
    { name: "九湯屋", link: "https://www.google.com/maps/search/?api=1&query=九湯屋+景美", rating: 4.1 }
  ],
  "大坪林": [
    { name: "Hiro's らぁ麵", link: "https://www.google.com/maps/search/?api=1&query=Hiro's+らぁ麵+大坪林", rating: 4.5 },
    { name: "大禾拉麵", link: "https://www.google.com/maps/search/?api=1&query=大禾拉麵+大坪林", rating: 4.3 },
    { name: "九湯屋", link: "https://www.google.com/maps/search/?api=1&query=九湯屋+大坪林", rating: 4.0 }
  ],
  "七張": [
    { name: "川牛木石亭", link: "https://www.google.com/maps/search/?api=1&query=川牛木石亭+七張", rating: 4.6 },
    { name: "花月嵐", link: "https://www.google.com/maps/search/?api=1&query=花月嵐+七張", rating: 4.0 },
    { name: "這味泰泰", link: "https://www.google.com/maps/search/?api=1&query=這味泰泰+七張", rating: 4.3 },
    { name: "初原麵場", link: "https://www.google.com/maps/search/?api=1&query=初原麵場+七張", rating: 4.2 }
  ],
  "小碧潭": [
    { name: "百壽爺", link: "https://www.google.com/maps/search/?api=1&query=百壽爺+小碧潭", rating: 4.2 },
    { name: "富士日本拉麵", link: "https://www.google.com/maps/search/?api=1&query=富士日本拉麵+小碧潭", rating: 4.3 }
  ],
  "新店": [
    { name: "佐棠拉麵", link: "https://www.google.com/maps/search/?api=1&query=佐棠拉麵+新店", rating: 4.5 },
    { name: "尻拉麵", link: "https://www.google.com/maps/search/?api=1&query=尻拉麵+新店", rating: 4.2 },
    { name: "海貓亭", link: "https://www.google.com/maps/search/?api=1&query=海貓亭+新店", rating: 4.0 }
  ],
  //以下為紅線
    "淡水": [
      { name: "雞道樂", link: "https://www.google.com/maps/search/?api=1&query=雞道樂+淡水", rating: 4.5 },
      { name: "麵屋敬太", link: "https://www.google.com/maps/search/?api=1&query=麵屋敬太+淡水", rating: 4.3 },
      { name: "二月拉麵", link: "https://www.google.com/maps/search/?api=1&query=二月拉麵+淡水", rating: 4.0 },
      { name: "彩日式拉麵", link: "https://www.google.com/maps/search/?api=1&query=彩日式拉麵+淡水", rating: 3.8 },
      { name: "七條通日式煎餃拉麵店", link: "https://www.google.com/maps/search/?api=1&query=七條通日式煎餃拉麵店+淡水", rating: 4.1 }
    ],
    "竹圍": [
      { name: "日本富士八峰拉麵", link: "https://www.google.com/maps/search/?api=1&query=日本富士八峰拉麵+竹圍", rating: 4.4 },
      { name: "李讚羹", link: "https://www.google.com/maps/search/?api=1&query=李讚羹+竹圍", rating: 4.0 },
      { name: "鮮拉麵", link: "https://www.google.com/maps/search/?api=1&query=鮮拉麵+竹圍", rating: 3.9 }
    ],
    "關渡": [
      { name: "厚恩拉麵", link: "https://www.google.com/maps/search/?api=1&query=厚恩拉麵+關渡", rating: 4.2 }
    ],
    "北投": [
      { name: "荷麵亭", link: "https://www.google.com/maps/search/?api=1&query=荷麵亭+北投", rating: 4.5 },
      { name: "葉櫻拉麵", link: "https://www.google.com/maps/search/?api=1&query=葉櫻拉麵+北投", rating: 4.0 },
      { name: "樂山窄巷", link: "https://www.google.com/maps/search/?api=1&query=樂山窄巷+北投", rating: 4.3 }
    ],
    "新北投": [
      { name: "滿客屋拉麵", link: "https://www.google.com/maps/search/?api=1&query=滿客屋拉麵+新北投", rating: 4.2 },
      { name: "日本拉麵屋", link: "https://www.google.com/maps/search/?api=1&query=日本拉麵屋+新北投", rating: 4.0 }
    ],
    "石牌": [
      { name: "黑曜麵屋", link: "https://www.google.com/maps/search/?api=1&query=黑曜麵屋+石牌", rating: 4.3 },
      { name: "神座拉麵", link: "https://www.google.com/maps/search/?api=1&query=神座拉麵+石牌", rating: 4.2 },
      { name: "餃麵", link: "https://www.google.com/maps/search/?api=1&query=餃麵+石牌", rating: 3.9 }
    ],
        "忠義": [
          {
            "name": "滿瀚鵝肉拉麵",
            "link": "https://www.google.com/maps/search/?api=1&query=滿瀚鵝肉拉麵+關渡",
            "rating": 4.2
          }
        ],
        "唭哩岸": [
          {
            "name": "大竹屋日式家庭料理",
            "link": "https://www.google.com/maps/search/?api=1&query=大竹屋日式家庭料理+唭哩岸",
            "rating": 4.4
          },
          {
            "name": "黑曜麵屋",
            "link": "https://www.google.com/maps/search/?api=1&query=黑曜麵屋+唭哩岸",
            "rating": 4.5
          }
        ],
        "臺大醫院": [
          {
            "name": "塩琉",
            "link": "https://www.google.com/maps/search/?api=1&query=塩琉+臺大醫院",
            "rating": 4.6
          }
        ],
        "東門": [
          {
            "name": "樂麵屋",
            "link": "https://www.google.com/maps/search/?api=1&query=樂麵屋+東門",
            "rating": 4.5
          },
          {
            "name": "微笑老蕭",
            "link": "https://www.google.com/maps/search/?api=1&query=微笑老蕭+東門",
            "rating": 4.3
          }
        ],
        "大安森林公園": [
          {
            "name": "樂幸拉麵",
            "link": "https://www.google.com/maps/search/?api=1&query=樂幸拉麵+大安森林公園",
            "rating": 4.4
          }
        ],
        "大安": [
          {
            "name": "醇一",
            "link": "https://www.google.com/maps/search/?api=1&query=醇一+大安",
            "rating": 4.3
          },
          {
            "name": "吉鴙",
            "link": "https://www.google.com/maps/search/?api=1&query=吉鴙+大安",
            "rating": 4.2
          },
          {
            "name": "美鄉拉麵屋",
            "link": "https://www.google.com/maps/search/?api=1&query=美鄉拉麵屋+大安",
            "rating": 4.5
          },
          {
            "name": "豚總長",
            "link": "https://www.google.com/maps/search/?api=1&query=豚總長+大安",
            "rating": 4.4
          }
        ],
        "台北101": [
          {
            "name": "一蘭",
            "link": "https://www.google.com/maps/search/?api=1&query=一蘭+台北101/世貿",
            "rating": 4.7
          },
          {
            "name": "柑橘Shinn-魚水",
            "link": "https://www.google.com/maps/search/?api=1&query=柑橘Shinn-魚水+台北101/世貿",
            "rating": 4.5
          },
          {
            "name": "一樂",
            "link": "https://www.google.com/maps/search/?api=1&query=一樂+台北101/世貿",
            "rating": 4.4
          },
          {
            "name": "伊禾白湯",
            "link": "https://www.google.com/maps/search/?api=1&query=伊禾白湯+台北101/世貿",
            "rating": 4.3
          },
          {
            "name": "悠拉麵",
            "link": "https://www.google.com/maps/search/?api=1&query=悠拉麵+台北101/世貿",
            "rating": 4.5
          }
        ],
        "象山": [
          {
            "name": "一蘭",
            "link": "https://www.google.com/maps/search/?api=1&query=一蘭+象山",
            "rating": 4.7
          },
          {
            "name": "一幻",
            "link": "https://www.google.com/maps/search/?api=1&query=一幻+象山",
            "rating": 4.6
          },
          {
            "name": "象子麵",
            "link": "https://www.google.com/maps/search/?api=1&query=象子麵+象山",
            "rating": 4.4
          },
          {
            "name": "麵匡匡",
            "link": "https://www.google.com/maps/search/?api=1&query=麵匡匡+象山",
            "rating": 4.5
          }
        ],

    "芝山": [
      { name: "二子山拉麵部屋", link: "https://www.google.com/maps/search/?api=1&query=二子山拉麵部屋+芝山", rating: 4.4 },
      { name: "CHILL RAMEN", link: "https://www.google.com/maps/search/?api=1&query=CHILL+RAMEN+芝山", rating: 4.2 },
      { name: "三丸拉麵", link: "https://www.google.com/maps/search/?api=1&query=三丸拉麵+芝山", rating: 4.0 }
    ],
    "士林": [
      { name: "荷麵亭", link: "https://www.google.com/maps/search/?api=1&query=荷麵亭+士林", rating: 4.5 },
      { name: "麵屋一番", link: "https://www.google.com/maps/search/?api=1&query=麵屋一番+士林", rating: 4.0 },
      { name: "百八龍拉麵", link: "https://www.google.com/maps/search/?api=1&query=百八龍拉麵+士林", rating: 4.3 }
    ],
    "劍潭": [
      { name: "麵屋道樂", link: "https://www.google.com/maps/search/?api=1&query=麵屋道樂+劍潭", rating: 4.2 },
      { name: "道樂屋台", link: "https://www.google.com/maps/search/?api=1&query=道樂屋台+劍潭", rating: 4.0 },
      { name: "山形心心", link: "https://www.google.com/maps/search/?api=1&query=山形心心+劍潭", rating: 4.1 },
      { name: "宮內屋", link: "https://www.google.com/maps/search/?api=1&query=宮內屋+劍潭", rating: 3.9 }
    ],
    "民權西路": [
      { name: "銀座小路", link: "https://www.google.com/maps/search/?api=1&query=銀座小路+民權西路", rating: 4.3 },
      { name: "小珍園", link: "https://www.google.com/maps/search/?api=1&query=小珍園+民權西路", rating: 4.1 },
      { name: "麵屋德家", link: "https://www.google.com/maps/search/?api=1&query=麵屋德家+民權西路", rating: 4.0 }
    ],
    "雙連": [
      { name: "誠屋", link: "https://www.google.com/maps/search/?api=1&query=誠屋+雙連", rating: 4.5 },
      { name: "池音", link: "https://www.google.com/maps/search/?api=1&query=池音+雙連", rating: 4.3 },
      { name: "不二家", link: "https://www.google.com/maps/search/?api=1&query=不二家+雙連", rating: 4.2 },
      { name: "木鳴", link: "https://www.google.com/maps/search/?api=1&query=木鳴+雙連", rating: 4.0 },
      { name: "特濃屋", link: "https://www.google.com/maps/search/?api=1&query=特濃屋+雙連", rating: 3.9 },
      { name: "姥夥房", link: "https://www.google.com/maps/search/?api=1&query=姥夥房+雙連", rating: 4.1 }
    ],
    "臺大醫院": [
      { name: "塩琉", link: "https://www.google.com/maps/search/?api=1&query=塩琉+臺大醫院", rating: 4.4 }
    ],

  //以下為藍線

    "南港": [
      { "name": "九湯屋", "link": "https://www.google.com/maps/search/?api=1&query=九湯屋+南港", "rating": 4.2 },
      { "name": "奧特拉麵", "link": "https://www.google.com/maps/search/?api=1&query=奧特拉麵+南港", "rating": 4.5 }
    ],
    "昆陽": [
      { "name": "鬼匠", "link": "https://www.google.com/maps/search/?api=1&query=鬼匠+昆陽", "rating": 4.0 }
    ],
    "永春": [
      { "name": "男子漢拉麵", "link": "https://www.google.com/maps/search/?api=1&query=男子漢拉麵+永春", "rating": 4.3 }
    ],
    "市政府": [
      { "name": "太陽番茄拉麵", "link": "https://www.google.com/maps/search/?api=1&query=太陽番茄拉麵+市政府", "rating": 4.4 },
      { "name": "一風堂", "link": "https://www.google.com/maps/search/?api=1&query=一風堂+市政府", "rating": 4.6 },
      { "name": "屯京", "link": "https://www.google.com/maps/search/?api=1&query=屯京+市政府", "rating": 4.1 },
      { "name": "花月嵐", "link": "https://www.google.com/maps/search/?api=1&query=花月嵐+市政府", "rating": 4.2 }
    ],
    "忠孝敦化": [
      { "name": "屯京", "link": "https://www.google.com/maps/search/?api=1&query=屯京+忠孝敦化", "rating": 4.1 },
      { "name": "博多拉麵", "link": "https://www.google.com/maps/search/?api=1&query=博多拉麵+忠孝敦化", "rating": 4.3 },
      { "name": "濃氣屋", "link": "https://www.google.com/maps/search/?api=1&query=濃氣屋+忠孝敦化", "rating": 4.0 }
    ],
    "台北車站": [
      { "name": "山頭火", "link": "https://www.google.com/maps/search/?api=1&query=山頭火+台北車站", "rating": 4.5 },
      { "name": "屯京", "link": "https://www.google.com/maps/search/?api=1&query=屯京+台北車站", "rating": 4.2 },
      { "name": "奧特", "link": "https://www.google.com/maps/search/?api=1&query=奧特+台北車站", "rating": 4.0 },
      { "name": "一風堂", "link": "https://www.google.com/maps/search/?api=1&query=一風堂+台北車站", "rating": 4.6 },
      { "name": "花月嵐", "link": "https://www.google.com/maps/search/?api=1&query=花月嵐+台北車站", "rating": 4.2 },
      { "name": "太陽番茄拉麵", "link": "https://www.google.com/maps/search/?api=1&query=太陽番茄拉麵+台北車站", "rating": 4.4 }
    ],
    "西門": [
      { "name": "麵樂屋", "link": "https://www.google.com/maps/search/?api=1&query=麵樂屋+西門", "rating": 4.3 },
      { "name": "ラーメン凪", "link": "https://www.google.com/maps/search/?api=1&query=ラーメン凪+西門", "rating": 4.4 },
      { "name": "花月嵐", "link": "https://www.google.com/maps/search/?api=1&query=花月嵐+西門", "rating": 4.2 },
      { "name": "九湯屋", "link": "https://www.google.com/maps/search/?api=1&query=九湯屋+西門", "rating": 4.1 },
      { "name": "鳥人", "link": "https://www.google.com/maps/search/?api=1&query=鳥人+西門", "rating": 4.5 }
    ],
    "新埔": [
      { "name": "山嵐", "link": "https://www.google.com/maps/search/?api=1&query=山嵐+新埔", "rating": 4.0 },
      { "name": "豚將", "link": "https://www.google.com/maps/search/?api=1&query=豚將+新埔", "rating": 4.2 },
      { "name": "幸花", "link": "https://www.google.com/maps/search/?api=1&query=幸花+新埔", "rating": 4.3 },
      { "name": "九湯屋", "link": "https://www.google.com/maps/search/?api=1&query=九湯屋+新埔", "rating": 4.1 },
      { "name": "這味泰泰", "link": "https://www.google.com/maps/search/?api=1&query=這味泰泰+新埔", "rating": 4.0 }
    ],
    "板橋": [
      { "name": "初原麵場", "link": "https://www.google.com/maps/search/?api=1&query=初原麵場+板橋", "rating": 4.3 },
      { "name": "樂麵屋", "link": "https://www.google.com/maps/search/?api=1&query=樂麵屋+板橋", "rating": 4.2 },
      { "name": "山頭火", "link": "https://www.google.com/maps/search/?api=1&query=山頭火+板橋", "rating": 4.5 },
      { "name": "豚將", "link": "https://www.google.com/maps/search/?api=1&query=豚將+板橋", "rating": 4.4 }
    ],
    "府中": [
      { "name": "滝禾製麵所", "link": "https://www.google.com/maps/search/?api=1&query=滝禾製麵所+府中", "rating": 4.1 },
      { "name": "博多拉麵", "link": "https://www.google.com/maps/search/?api=1&query=博多拉麵+府中", "rating": 4.0 }
    ],
    "亞東醫院": [
      { "name": "豚將", "link": "https://www.google.com/maps/search/?api=1&query=豚將+亞東醫院", "rating": 4.3 }
    ],
    "海山": [
      { "name": "鬼匠", "link": "https://www.google.com/maps/search/?api=1&query=鬼匠+海山", "rating": 4.4 },
      { "name": "豚將", "link": "https://www.google.com/maps/search/?api=1&query=豚將+海山", "rating": 4.5 }
    ],
    "土城": [
      { "name": "初原麵場", "link": "https://www.google.com/maps/search/?api=1&query=初原麵場+土城", "rating": 4.2 }
    ],
    "善導寺": [
      { "name": "鷹流東京醬油拉麵-蘭丸", "link": "https://maps.app.goo.gl/rEV4jP9gfAYV66Ko6", "rating": 4.3 }
    ],
    "後山埤": [
      { "name": "麵匡匡拉麵食堂", "link": "https://maps.app.goo.gl/odKwe5wReLwX9A5HA", "rating": 4.2 }
    ],
    "國父紀念館": [
      { "name": "麵屋壹の穴 ICHI", "link": "https://maps.app.goo.gl/qXpkex5SaVYYAaXC9", "rating": 4.4 },
  { "name": "麵屋武藏", "link": "https://maps.app.goo.gl/og78MHbjU58qDZk28", "rating": 4.5 },
      { "name": "一風堂", "link": "https://maps.app.goo.gl/N8LVGjAmn7qHCB2Q7", "rating": 4.6 }
    ],
    "後山埤": [
      { "name": "麵匡匡拉麵食堂", "link": "https://maps.app.goo.gl/odKwe5wReLwX9A5HA", "rating": 4.2 }
    ],
    "龍山寺": [
      { "name": "萬華【山麻拉麵屋】", "link": "https://maps.app.goo.gl/vFUz3J4Uy4kFggGy6", "rating": 4.3 }
    ],
    "江子翠": [
      { "name": "二鬼麵舖【板橋店】", "link": "https://maps.app.goo.gl/9N9fVjMPsvFaUk71A", "rating": 4.0 }
    ],


"南港展覽館": [
    { 
      "name": "樂麵屋", 
      "link": "https://www.google.com/maps/search/?api=1&query=樂麵屋+南港展覽館", 
      "rating": 4.0 
    }
  ],
"湖州": [
    { 
      "name": "博多拉麵", 
      "link": "https://www.google.com/maps/search/?api=1&query=博多拉麵+湖州", 
      "rating": 4.1 
    }
  ],
"內湖": [
    { 
      "name": "九湯屋", 
      "link": "https://www.google.com/maps/search/?api=1&query=九湯屋+內湖", 
      "rating": 4.2 
    }
  ],
"港墘": [
    { 
      "name": "滝禾製麵所", 
      "link": "https://www.google.com/maps/search/?api=1&query=滝禾製麵所+港墘", 
      "rating": 4.0 
    },
    { 
      "name": "男子漢拉麵", 
      "link": "https://www.google.com/maps/search/?api=1&query=男子漢拉麵+港墘", 
      "rating": 4.3 
    }
  ],
"劍南路": [
    { 
      "name": "太陽番茄拉麵", 
      "link": "https://www.google.com/maps/search/?api=1&query=太陽番茄拉麵+劍南路", 
      "rating": 4.1 
    },
    { 
      "name": "ラーメン凪", 
      "link": "https://www.google.com/maps/search/?api=1&query=ラーメン凪+劍南路", 
      "rating": 4.0 
    }
  ],
"大直": [
    { 
      "name": "九湯屋", 
      "link": "https://www.google.com/maps/search/?api=1&query=九湯屋+大直", 
      "rating": 4.1 
    }
  ],
"中山國中": [
    { 
      "name": "力量拉麵", 
      "link": "https://www.google.com/maps/search/?api=1&query=力量拉麵+中山國中", 
      "rating": 4.2 
    }
  ],
"忠孝復興": [
    { 
      "name": "ラーメン凪", 
      "link": "https://www.google.com/maps/search/?api=1&query=ラーメン凪+忠孝復興", 
      "rating": 4.0 
    },
    { 
      "name": "山頭火", 
      "link": "https://www.google.com/maps/search/?api=1&query=山頭火+忠孝復興", 
      "rating": 4.3 
    },
    { 
      "name": "鳥人", 
      "link": "https://www.google.com/maps/search/?api=1&query=鳥人+忠孝復興", 
      "rating": 4.4 
    },
    { 
      "name": "這味泰泰", 
      "link": "https://www.google.com/maps/search/?api=1&query=這味泰泰+忠孝復興", 
      "rating": 4.1 
    }
  ],
"科技大樓": [
    { 
      "name": "滝禾製麵所", 
      "link": "https://www.google.com/maps/search/?api=1&query=滝禾製麵所+科技大樓", 
      "rating": 4.0 
    },
    { 
      "name": "濃氣屋", 
      "link": "https://www.google.com/maps/search/?api=1&query=濃氣屋+科技大樓", 
      "rating": 4.2 
    },
    { 
      "name": "這味泰泰", 
      "link": "https://www.google.com/maps/search/?api=1&query=這味泰泰+科技大樓", 
      "rating": 4.1 
    }
  ],
"六張犁": [
    { 
      "name": "滝禾製麵所", 
      "link": "https://www.google.com/maps/search/?api=1&query=滝禾製麵所+六張犁", 
      "rating": 4.0 
    }
  ],
"辛亥": [
    { 
      "name": "長生塩人", 
      "link": "https://www.google.com/maps/search/?api=1&query=長生塩人+辛亥", 
      "rating": 4.2 
    }
  ],
"萬芳醫院": [
    { 
      "name": "鬼匠", 
      "link": "https://www.google.com/maps/search/?api=1&query=鬼匠+萬芳醫院", 
      "rating": 4.3 
    }
  ],
"木柵": [
    { 
      "name": "鬼匠", 
      "link": "https://www.google.com/maps/search/?api=1&query=鬼匠+木柵", 
      "rating": 4.1 
    }
  ],
"西湖": [
    { 
      "name": "福岡屋拉麵", 
      "link": "https://maps.app.goo.gl/xojB4sHq7GggQLXs8", 
      "rating": 4.0 
    }
  ],
"文德": [
    { 
      "name": "麵匡匡拉麵食堂", 
      "link": "https://maps.app.goo.gl/KA53Fip4vcxs1pgY6", 
      "rating": 4.2 
    }
  ],
"葫洲": [
    { 
      "name": "令和博多拉麵", 
      "link": "https://maps.app.goo.gl/J5QTR5B5zb52wxxa6", 
      "rating": 4.1 
    },
    { 
      "name": "博多拉麵", 
      "link": "https://maps.app.goo.gl/DgaEa9t3EJ2sDAQf9", 
      "rating": 4.0 
    }
  ],
"東湖": [
    { 
      "name": "長生塩人", 
      "link": "https://maps.app.goo.gl/56k9Kttz7oQpn6mm7", 
      "rating": 4.1 
    },
    { 
      "name": "樂禾田拉麵", 
      "link": "https://maps.app.goo.gl/Qkj6ngr73LSF6bRk9", 
      "rating": 4.0 
    }
  ],
"南港軟體園區": [
    { 
      "name": "樂麵屋", 
      "link": "https://maps.app.goo.gl/KtTDrrgRZBALoVjn6", 
      "rating": 4.2 
    },
    { 
      "name": "OSHO 拉麵", 
      "link": "https://maps.app.goo.gl/Qw637tCTk2MG4qYH8", 
      "rating": 4.3 
    }
  ],
  //以下為橘線
  "南勢角": [
    { name: "小高拉麵", link: "https://www.google.com/maps/search/?api=1&query=小高拉麵+南勢角", rating: 4.0 }
  ],
"景安": [
    { name: "藏味拉麵", link: "https://www.google.com/maps/search/?api=1&query=藏味拉麵+景安", rating: 4.3 },
    { name: "白川麵場", link: "https://www.google.com/maps/search/?api=1&query=白川麵場+景安", rating: 4.1 }
  ],
"永安市場": [
    { name: "豚王拉麵", link: "https://www.google.com/maps/search/?api=1&query=豚王拉麵+永安市場", rating: 4.2 },
    { name: "麵屋天曉得", link: "https://www.google.com/maps/search/?api=1&query=麵屋天曉得+永安市場", rating: 4.0 }
  ],
"頂溪": [
    { name: "辰拉麵", link: "https://www.google.com/maps/search/?api=1&query=辰拉麵+頂溪", rating: 4.4 },
    { name: "醉心", link: "https://www.google.com/maps/search/?api=1&query=醉心+頂溪", rating: 4.1 },
    { name: "太子拉麵", link: "https://www.google.com/maps/search/?api=1&query=太子拉麵+頂溪", rating: 4.2 },
    { name: "小林拉麵", link: "https://www.google.com/maps/search/?api=1&query=小林拉麵+頂溪", rating: 3.9 }
  ],
"松江南京": [
    { name: "麵屋輝", link: "https://www.google.com/maps/search/?api=1&query=麵屋輝+松江南京", rating: 4.0 },
    { name: "李好拉麵", link: "https://www.google.com/maps/search/?api=1&query=李好拉麵+松江南京", rating: 4.2 },
    { name: "鬼金棒", link: "https://www.google.com/maps/search/?api=1&query=鬼金棒+松江南京", rating: 4.5 },
    { name: "三本手工拉麵", link: "https://www.google.com/maps/search/?api=1&query=三本手工拉麵+松江南京", rating: 4.3 },
    { name: "路禾", link: "https://www.google.com/maps/search/?api=1&query=路禾+松江南京", rating: 4.1 }
  ],
"中山國小": [
    { name: "金沢拉麵", link: "https://www.google.com/maps/search/?api=1&query=金沢拉麵+中山國小", rating: 4.0 },
    { name: "梓山", link: "https://www.google.com/maps/search/?api=1&query=梓山+中山國小", rating: 4.3 },
    { name: "壹慶", link: "https://www.google.com/maps/search/?api=1&query=壹慶+中山國小", rating: 4.4 },
    { name: "悠然", link: "https://www.google.com/maps/search/?api=1&query=悠然+中山國小", rating: 4.2 }
  ],
"大橋頭": [
    { name: "富山天滿", link: "https://www.google.com/maps/search/?api=1&query=富山天滿+大橋頭", rating: 3.9 }
  ],
"台北橋": [
    { name: "金澤冠軍咖哩拉麵", link: "https://www.google.com/maps/search/?api=1&query=金澤冠軍咖哩拉麵+台北橋", rating: 4.0 }
  ],
"菜寮": [
    { name: "恩麵屋", link: "https://www.google.com/maps/search/?api=1&query=恩麵屋+菜寮", rating: 4.1 },
    { name: "豚王拉麵", link: "https://www.google.com/maps/search/?api=1&query=豚王拉麵+菜寮", rating: 4.0 }
  ],
"三重": [
    { name: "23私房拉麵(預約制)", link: "https://www.google.com/maps/search/?api=1&query=23私房拉麵+三重", rating: 4.2 },
    { name: "火曜拉麵三番目", link: "https://www.google.com/maps/search/?api=1&query=火曜拉麵三番目+三重", rating: 4.3 }
  ],
"新莊": [
    { name: "讓麵煮一會", link: "https://www.google.com/maps/search/?api=1&query=讓麵煮一會+新莊", rating: 4.0 },
    { name: "麵屋一番", link: "https://www.google.com/maps/search/?api=1&query=麵屋一番+新莊", rating: 4.1 },
    { name: "麵屋龍", link: "https://www.google.com/maps/search/?api=1&query=麵屋龍+新莊", rating: 4.3 },
    { name: "御記", link: "https://www.google.com/maps/search/?api=1&query=御記+新莊", rating: 4.2 },
    { name: "蒔桐", link: "https://www.google.com/maps/search/?api=1&query=蒔桐+新莊", rating: 4.4 }
  ],
"輔大": [
    { name: "麵屋三郎", link: "https://www.google.com/maps/search/?api=1&query=麵屋三郎+輔大", rating: 4.0 },
    { name: "竹拉麵", link: "https://www.google.com/maps/search/?api=1&query=竹拉麵+輔大", rating: 4.2 },
    { name: "一口入魂", link: "https://www.google.com/maps/search/?api=1&query=一口入魂+輔大", rating: 4.1 }
  ],
"丹鳳": [
    { name: "博多赤麵廠", link: "https://www.google.com/maps/search/?api=1&query=博多赤麵廠+丹鳳", rating: 4.1 },
    { name: "丸吉左衙門", link: "https://www.google.com/maps/search/?api=1&query=丸吉左衙門+丹鳳", rating: 4.2 }
  ],
"行天宮": [
    { name: "雞湯桑 Torisan", link: "https://maps.app.goo.gl/1sieDqwrVVAaqoaS7", rating: 4.3 }
  ],
"三和國中": [
    { name: "麵匡匡拉麵食堂", link: "https://maps.app.goo.gl/8TB8jsvGGpo45diW7", rating: 4.0 }
  ],
"三重國小": [
    { name: "酗拉麵", link: "https://maps.app.goo.gl/w9wo69nHEzhMWGms8", rating: 4.1 },
    { name: "炊煙拉麵", link: "https://maps.app.goo.gl/VAsZ3tFojcSxqQ279", rating: 4.2 }
  ],
"徐匯中學": [
    { name: "麵屋道樂", link: "https://maps.app.goo.gl/aLeTaZRQnF24JfxB7", rating: 4.3 },
    { name: "鬼匠拉麵", link: "https://maps.app.goo.gl/SuFBZ4KJsdKAmybt9", rating: 4.4 }
  ],
"三民高中": [
    { name: "九湯屋日式拉麵", link: "https://maps.app.goo.gl/JMCHAMz3wTgDpfi19", rating: 4.0 },
    { name: "麵匡匡拉麵食堂", link: "https://maps.app.goo.gl/Y7hpvMmEppMtTf1t7", rating: 4.0 },
],
"蘆洲": [
    {
      "name": "柳町家拉麵",
      "link": "https://maps.app.goo.gl/iSyXCHMNAvkD1b2J8",
      "rating": 4.1
    }
  ],
  "先嗇宮": [
    {
      "name": "らあめん花月嵐",
      "link": "https://maps.app.goo.gl/XcHMe9b35Cs6SAn78",
      "rating": 4.0
    }
  ],
  "古亭": [
    {
      "name": "一階堂拉麵",
      "link": "https://maps.app.goo.gl/jtRR9NXnkqjiouySA",
      "rating": 4.2
    }
  ],
  
  


  
  // 可在此補充其他捷運站對應的拉麵店資訊
};

function MrtRamenSystem({ onBack }) {
    const [userLocation, setUserLocation] = useState(null); // 使用者的座標
    const [nearestStation, setNearestStation] = useState(null); // 最近的捷運站
    const [selectedStation, setSelectedStation] = useState(null); // 點擊的捷運站
    const [weather, setWeather] = useState(null); // 天氣資訊

        
  
  // 使用者定位
  
  // 捷運站資料
  const stations = [
    // 淡水信義線
    { name: "象山", latitude: 25.032728, longitude: 121.570646 },
    { name: "台北101/世貿", latitude: 25.033671, longitude: 121.564427 },
    { name: "信義安和", latitude: 25.033105, longitude: 121.553031 },
    { name: "大安", latitude: 25.033017, longitude: 121.543059 },
    { name: "忠孝敦化", latitude: 25.041184, longitude: 121.550505 },
    { name: "忠孝復興", latitude: 25.041337, longitude: 121.544579 },
    { name: "忠孝新生", latitude: 25.041838, longitude: 121.533974 },
    { name: "善導寺", latitude: 25.045184, longitude: 121.522282 },
    { name: "台北車站", latitude: 25.047675, longitude: 121.517055 },
    { name: "中山", latitude: 25.052229, longitude: 121.520625 },
    { name: "雙連", latitude: 25.062075, longitude: 121.520341 },
    { name: "民權西路", latitude: 25.062679, longitude: 121.519818 },
    { name: "圓山", latitude: 25.072611, longitude: 121.520613 },
    { name: "劍潭", latitude: 25.084183, longitude: 121.525142 },
    { name: "士林", latitude: 25.092731, longitude: 121.526384 },
    { name: "芝山", latitude: 25.102533, longitude: 121.522124 },
    { name: "明德", latitude: 25.109799, longitude: 121.515738 },
    { name: "石牌", latitude: 25.114207, longitude: 121.514946 },
    { name: "唭哩岸", latitude: 25.120568, longitude: 121.511027 },
    { name: "北投", latitude: 25.131219, longitude: 121.498524 },
    { name: "新北投", latitude: 25.136903, longitude: 121.503776 },
    { name: "復興崗", latitude: 25.137937, longitude: 121.485465 },
    { name: "忠義", latitude: 25.157597, longitude: 121.444355 },
    { name: "關渡", latitude: 25.125438, longitude: 121.467226 },
    { name: "竹圍", latitude: 25.137156, longitude: 121.461648 },
    { name: "紅樹林", latitude: 25.155174, longitude: 121.459666 },
    { name: "淡水", latitude: 25.169558, longitude: 121.444369 },

    // 板南線
    { name: "頂埔", latitude: 24.914245, longitude: 121.537056 },
    { name: "永寧", latitude: 24.937736, longitude: 121.562728 },
    { name: "土城", latitude: 24.97303, longitude: 121.479581 },
    { name: "海山", latitude: 24.982205, longitude: 121.449781 },
    { name: "亞東醫院", latitude: 24.985212, longitude: 121.466497 },
    { name: "新埔", latitude: 25.021113, longitude: 121.465944 },
    { name: "板橋", latitude: 25.014273, longitude: 121.462733 },
    { name: "江子翠", latitude: 25.031045, longitude: 121.46817 },
    { name: "龍山寺", latitude: 25.035294, longitude: 121.499833 },
    { name: "西門", latitude: 25.042145, longitude: 121.507577 },
    { name: "國父紀念館", latitude: 25.041853, longitude: 121.557426 },
    { name: "市政府", latitude: 25.040791, longitude: 121.567662 },
    { name: "永春", latitude: 25.040495, longitude: 121.5782 },
    { name: "後山埤", latitude: 25.045078, longitude: 121.58469 },
    { name: "昆陽", latitude: 25.050409, longitude: 121.592794 },
    { name: "南港", latitude: 25.052481, longitude: 121.609878 },
    { name: "南港展覽館", latitude: 25.055731, longitude: 121.617834 },
];

  // 計算最近的捷運站
  const calculateNearestStation = (latitude, longitude) => {
    const getDistance = (lat1, lon1, lat2, lon2) => {
      const toRad = (value) => (value * Math.PI) / 180;
      const R = 6371; // 地球半徑 (公里)
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // 距離 (公里)
    };

    let nearestStation = stations[0];
    let minDistance = getDistance(latitude, longitude, stations[0].latitude, stations[0].longitude);

    stations.forEach((station) => {
      const distance = getDistance(latitude, longitude, station.latitude, station.longitude);
      if (distance < minDistance) {
        nearestStation = station;
        minDistance = distance;
      }
    });

    return nearestStation.name;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          const nearestStationName = calculateNearestStation(latitude, longitude);
          setNearestStation(nearestStationName);
        },
        (error) => {
          console.error("無法獲取定位資訊", error);
          setNearestStation("定位失敗，請開啟定位權限。");
        }
      );
    } else {
      setNearestStation("瀏覽器不支援定位功能。");
    }
  }, []);

  const handleStationClick = (stationName) => {
    setSelectedStation(stationName);
  };
  const renderStars = (rating) => {
    // 確保 rating 是有效的數字且範圍在 0 到 5 之間
    if (typeof rating !== "number" || isNaN(rating) || rating < 0 || rating > 5) {
      console.error("Invalid rating value detected. Defaulting to 0.");
      rating = 0; // 預設為 0 星
    }
  
    const fullStars = Math.floor(rating); // 實星數
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0; // 半星數
    const emptyStars = 5 - fullStars - halfStar; // 空星數
  
    // 防止生成無效的陣列長度
    if (fullStars < 0 || halfStar < 0 || emptyStars < 0) {
      console.error("Star count calculation error. Defaulting to empty stars.");
      return Array(5)
        .fill(0)
        .map((_, i) => <FaRegStar key={`empty-${i}`} style={{ color: "#ffc107" }} />);
    }
  
    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <FaStar key={`full-${i}`} style={{ color: "#ffc107" }} />
          ))}
        {halfStar === 1 && <FaStarHalfAlt style={{ color: "#ffc107" }} />}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <FaRegStar key={`empty-${i}`} style={{ color: "#ffc107" }} />
          ))}
      </>
    );
  };

  return (
    <div className="App">
      <h1>台北捷運拉麵地圖</h1>
      <button onClick={onBack}>回到主畫面</button>
      <div>
        <p>使用者位置: {userLocation ? `${userLocation.latitude}, ${userLocation.longitude}` : "定位中..."}</p>
        <p>最近的捷運站: {nearestStation || "計算中..."}</p>
      </div>

      <div className="map-container">
        <img src={mrtMap} alt="台北捷運地圖" className="mrt-map" />
        {mrtStations.map((station) => (
          <button
            key={station.name}
            className="station-button"
            style={{ top: station.top, left: station.left }}
            onClick={() => handleStationClick(station.name)}
          >
            {station.name}
          </button>
        ))}
      </div>

      {selectedStation && (
        <div className="station-info">
          <h2>選中的捷運站：{selectedStation}</h2>
          <h3>附近的拉麵店:</h3>
          <ul>
            {ramenStores[selectedStation]
              ? ramenStores[selectedStation].map((store, index) => (
                  <li key={index}>
                    <a href={store.link} target="_blank" rel="noopener noreferrer">
                      {store.name}
                    </a>
                    <div className="rating">{renderStars(store.rating)}</div>
                  </li>
                ))
              : "目前無資料"}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MrtRamenSystem;