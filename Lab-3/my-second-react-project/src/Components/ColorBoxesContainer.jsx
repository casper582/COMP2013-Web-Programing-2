import React, { useState } from "react";
import ColorBox from "./ColorBox";

export default function ColorBoxesContainer({ colors }) {
  const [colorList, setColorList] = useState(colors);

  function changeRandomColor(index) {
    const newColors = [...colorList];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    newColors[index] = randomColor;
    setColorList(newColors);
  }

  return (
    <div className="ColorBoxesContainer">
      {colorList.map((color, index) => (
        <div
          className="ColorBox"
          key={index}
          style={{ backgroundColor: color }}
          onClick={() => changeRandomColor(index)}
        ></div>
      ))}
    </div>
  );
}
