export default function ColorBox({ colors }) {
  return (
    <div className="ColorBoxesContainer">
      {colors.map((color, index) => (
        <div
          className="ColorBox"
          key={index}
          style={{ backgroundColor: color }}
          onClick={() => console.log("I am clicked")}
        ></div>
      ))}
    </div>
  );
}
