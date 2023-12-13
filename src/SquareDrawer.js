import React, { useEffect, useState } from "react";
import AnnotationImg from "./AnnotationImg";

const SquareDrawer = () => {
  const [startPosition, setStartPosition] = useState({ x: null, y: null });
  const [endPosition, setEndPosition] = useState({ x: null, y: null });
  const [draws, setDraws] = useState([]);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    console.log("draws: ", draws);
  }, [draws]);

  const handleMouseDown = (e) => {
    setStartPosition({ x: e.clientX, y: e.clientY });
    setDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    setEndPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    console.log("startPosition: ", startPosition);
    console.log("endPosition: ", endPosition);
    const x = {
      startPos: {
        x: startPosition.x,
        y: startPosition.y,
      },
      endPos: {
        x: endPosition.x,
        y: endPosition.y,
      },
    };
    setDraws((prev) => [...prev, x]);
    setDrawing(false);
  };

  return (
    <div
      // onMouseDown={handleMouseDown}
      // onMouseMove={handleMouseMove}
      // onMouseUp={handleMouseUp}
      style={{
        position: "relative",
        width: "500px",
        border: "1px solid #000",
        zIndex: 10,
      }}
    >
      <AnnotationImg />
    </div>
  );
};

export default SquareDrawer;
