import React, { useEffect, useRef, useState } from "react";
import ml5 from "ml5";
import useInterval from "@use-it/interval";
import Chart from "./Chart";
import Icons from "./Icons";
import "./App.css";

let classifier;

function App() {
  const videoRef = useRef();
  const [result, setResult] = useState([]);

  // imageClassifier or objectDetector

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
        console.log(results);
      });
    }
  }, 500);

  return (
    <>
      <div className="relative bg-gray-900">
        <div className="relative h-80 overflow-hidden bg-gray-900 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2 ml-5">
          <video
            ref={videoRef}
            style={{
              transform: "scale(-1, 1)",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:py-30 lg:px-8">
          <div className="pr-6 pl-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
            <h2 className="text-base font-semibold leading-7 text-cyan-400">
              Activate your camera and place your US-ID/US-DL in the frame
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              US-ID Card / Drivers License Detection
            </p>
            <p className="mt-6 text-base leading-7 text-gray-300">
              This is a React Computer Vision project that serves as a proof of
              concept for identifying the front and back of US-issued IDs. The
              project utilizes computer vision techniques to analyze images and
              recognize ID card templates to accurately locate and classify the
              front and back of the ID. The implementation of this project aims
              to demonstrate the potential of computer vision technology in the
              field of identity verification and improve the accuracy and
              efficiency of this process.
            </p>
            <div className="mt-8">
              <a
                href="https://github.com/cbaezp/react-dl"
                className="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:bg-cyan-500"
              >
                Github
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black">
        {result.length > 0 && (
          <div>
            <Chart data={result[0]} />
          </div>
        )}
      </div>

      <Icons />
    </>
  );
}

export default App;
