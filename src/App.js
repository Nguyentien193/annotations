import React, { useState } from "react";
import Annotation from "./Annotation";
// import Annotation from "react-image-annotation";
import "./App.css";
function App() {
  const [annotations, setAnnotations] = useState([]);
  const [annotation, setAnnotation] = useState({});

  const onChange = (newAnnotation) => {
    setAnnotation(newAnnotation);
  };

  const onSubmit = (newAnnotation) => {
    console.log("annotation: ", newAnnotation);
    const { geometry, data } = newAnnotation;

    setAnnotation({});
    setAnnotations((prevAnnotations) => [
      ...prevAnnotations,
      {
        geometry,
        data: {
          ...data,
          id: Math.random(),
        },
      },
    ]);
  };

  console.log("11111: ", annotations);
  console.log("state: ", { annotations, annotation });
  const img =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoeYmJ9fIoI0OOytKQJMTnodwJ1tuIaknTfg&usqp=CAU";
  return (
    // <Annotation
    //   src={img}
    //   alt="Two pebbles anthropomorphized holding hands"
    //   annotations={annotations}
    //   type={annotation.type}
    //   value={annotation}
    //   onChange={onChange}
    //   onSubmit={onSubmit}
    //   allowTouch
    // />
    <Annotation />
  );
}

export default App;
