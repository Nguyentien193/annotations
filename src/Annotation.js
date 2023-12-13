import React, { useState, useEffect } from "react";
const Annotation = () => {
  const [annotations, setAnnotations] = useState([]);

  const [form, setForm] = useState({ title: "", text: "", x: 0, y: 0 });
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

  return (
    <div id="app">
      <div id="annotated-image-wrapper" className="annotated-image-wrapper">
        <img
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
      </div>
    </div>
  );
};

export default Annotation;
