import React, { useState, useEffect } from "react";
const AnnotationImg = () => {
  const [annotations, setAnnotations] = useState([]);
  const [form, setForm] = useState({ title: "", text: "", x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: null, y: null });
  const [endPosition, setEndPosition] = useState({ x: null, y: null });
  const [draws, setDraws] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [isDd, setIsDd] = useState(false);
  useEffect(() => {
    console.log("form: ", form);
  }, [form]);

  useEffect(() => {
    if (!annotations.length) {
      return;
    }

    annotations.forEach((annotation) => {
      initializePopover(annotation);
    });
  }, [annotations]);

  const onImageClick = (event) => {
    console.log("event: ", event);
    const rect = document
      .getElementById("annotated-image")
      .getBoundingClientRect();
    const x = parseInt(event.clientX - rect.x, 10);
    const y = parseInt(event.clientY - rect.y, 10);
    console.log("rect: ", rect);
    const newForm = {
      ...form,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    };
    setForm(newForm);
    const randomId = Math.random().toString().replace(".", "_");
    const annotation = {
      id: `annotation-${randomId}`,
      title: `title${randomId}`,
      text: `text${randomId}`,
      x: newForm.x,
      y: newForm.y,
    };
    setAnnotations([...annotations, annotation]);
    initializePopover(annotation);
  };

  const initializePopover = (annotation) => {
    const popoverElement = document.getElementById(annotation.id);

    if (popoverElement) {
      popoverElement.addEventListener("click", () => {
        const popoverContent = document.createElement("div");
        document.body.appendChild(popoverContent);
        popoverElement.appendChild(popoverContent);

        // Close the popover when clicking outside
        document.addEventListener("click", (clickEvent) => {
          const isOutsidePopover = !popoverElement.contains(clickEvent.target);
          if (isOutsidePopover) {
            popoverContent.remove();
          }
        });
      });
    }
  };

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
    setEndPosition({});
    setStartPosition({});
  };

  return (
    <div id="app">
      <div
        // onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        id="annotated-image-wrapper"
        className="annotated-image-wrapper"
      >
        <img
          style={{
            zIndex: 10,
          }}
          id="annotated-image"
          src="https://images.unsplash.com/photo-1528254609158-ae7dfaa48ab3?fit=crop&w=1350&q=80"
          alt=""
          onClick={onImageClick}
        />
        {annotations.map((annotation) => (
          <div
            key={annotation.id}
            className="image-annotation"
            id={annotation.id}
            style={{ top: `${annotation.y}%`, left: `${annotation.x}%` }}
          ></div>
        ))}

        {drawing && (
          <div
            style={{
              position: "absolute",
              left: startPosition.x,
              top: startPosition.y,
              width: endPosition.x - startPosition.x,
              height: endPosition.y - startPosition.y,
              border: "2px solid #000",
            }}
          />
        )}
        {draws.length > 0 &&
          draws.map((item, idx) => (
            <div
              key={item.startPos.x}
              style={{
                position: "absolute",
                left: item.startPos.x,
                top: item.startPos.y,
                width: item.endPos.x - item.startPos.x,
                height: item.endPos.y - item.startPos.y,
                border: "2px solid #000",
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default AnnotationImg;
