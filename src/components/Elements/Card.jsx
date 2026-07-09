import React, { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

function Card(props) {
  const { title, link = false, desc } = props;
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="h-full flex flex-col">
      <div
        className={`flex justify-between items-center mb-2 ${
          darkMode ? "text-gray-200" : "text-gray-02"
        }`}
      >
        <div className="text-2xl">{title}</div>
        {link && <div className="text-xs">View All</div>}
      </div>
      <div
        className={`flex-1 rounded-lg px-6 py-5 shadow-xl transition-all duration-300 ${
          darkMode ? "bg-[#3A3A3A] text-white" : "bg-white text-black"
        }`}
      >
        {desc}
      </div>
    </div>
  );
}

export default Card;
