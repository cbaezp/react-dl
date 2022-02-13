import React, { useEffect, useRef, useState } from "react";
import ml5 from "ml5";
import useInterval from "@use-it/interval";

import Chart from "./Chart";

import "./App.css";

let classifier;

function App() {
  const videoRef = useRef();
  const [result, setResult] = useState([]);


  useEffect(() => {
    classifier = ml5.imageClassifier("./model/model.json", () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          
        });
    });
  }, []);

  useInterval(() => {
    if (classifier) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        setResult(results);
        
      });
    }
  }, 500);

  return (
    <div className="flex justify-center mt-10">

      <div className="">
        <div className="">
          
          <video
            ref={videoRef}
            style={{ transform: "scale(-1, 1)" }}
            width="720"
            height="1000"
          />
        </div>
        <div className="bg-gray-300">
          {result.length > 0 && (
            <div>
              <Chart data={result[0]} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
