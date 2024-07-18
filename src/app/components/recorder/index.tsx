import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera } from "@mediapipe/camera_utils";
import {
  HAND_CONNECTIONS,
  Holistic,
  POSE_CONNECTIONS,
  Results,
} from "@mediapipe/holistic";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import * as tf from "@tensorflow/tfjs";

const MAX_SEQUENCE_LENGTH = 346;
const NUM_FEATURES = 258;

interface LandmarksData {
  landmarks: number[];
}

function Recorder() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [landmarksData, setLandmarksData] = useState<LandmarksData[]>([]);
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  const onResults = (results: Results) => {
    if (!webcamRef.current?.video || !canvasRef.current) return;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    if (canvasCtx == null) throw new Error("Could not get context");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = "source-in";
    canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = "destination-atop";
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    canvasCtx.globalCompositeOperation = "source-over";
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
      color: "#00FF00",
      lineWidth: 4,
    });
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: "#FF0000",
      lineWidth: 2,
    });
    drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
      color: "#CC0000",
      lineWidth: 5,
    });
    drawLandmarks(canvasCtx, results.leftHandLandmarks, {
      color: "#00FF00",
      lineWidth: 2,
    });
    drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
      color: "#00CC00",
      lineWidth: 5,
    });
    drawLandmarks(canvasCtx, results.rightHandLandmarks, {
      color: "#FF0000",
      lineWidth: 2,
    });
    canvasCtx.restore();

    // Extract landmarks
    const landmarks = extractLandmarks(results);

    if (landmarksData.length < MAX_SEQUENCE_LENGTH) {
      setLandmarksData((prevData) => [...prevData, { landmarks }]);
    }
  };

  const extractLandmarks = (results: Results) => {
    const pose = results.poseLandmarks
      ? results.poseLandmarks
          .map((res) => [res.x, res.y, res.z, res.visibility])
          .flat()
      : new Array(33 * 4).fill(0);

    const lh = results.leftHandLandmarks
      ? results.leftHandLandmarks.map((res) => [res.x, res.y, res.z]).flat()
      : new Array(21 * 3).fill(0);

    const rh = results.rightHandLandmarks
      ? results.rightHandLandmarks.map((res) => [res.x, res.y, res.z]).flat()
      : new Array(21 * 3).fill(0);

    return [...pose, ...lh, ...rh];
  };

  const prepareData = () => {
    // Ensure we have the correct number of frames
    while (landmarksData.length < MAX_SEQUENCE_LENGTH) {
      landmarksData.push({ landmarks: new Array(NUM_FEATURES).fill(0) });
    }

    // Truncate excess frames
    const truncatedData = landmarksData.slice(0, MAX_SEQUENCE_LENGTH);

    // Convert landmarksData to the shape (346, 258, 3)
    const data = truncatedData.map((frame) => frame.landmarks);

    // Flatten the data to match the total element count
    const flattenedData = data.flat();

    // Make sure the flattened data has the correct number of elements
    if (flattenedData.length !== MAX_SEQUENCE_LENGTH * NUM_FEATURES) {
      console.error(
        `Expected ${MAX_SEQUENCE_LENGTH * NUM_FEATURES} elements but got ${
          flattenedData.length
        }`
      );
    }

    return tf.tensor(flattenedData, [MAX_SEQUENCE_LENGTH, NUM_FEATURES]);
  };

  useEffect(() => {
    const holistic = new Holistic({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });
    holistic.setOptions({
      selfieMode: true,
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    holistic.onResults(onResults);

    if (webcamRef.current !== null && webcamRef.current.video !== null) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          if (webcamRef.current?.video) {
            await holistic.send({ image: webcamRef.current.video });
          }
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  useEffect(() => {
    if (landmarksData.length === MAX_SEQUENCE_LENGTH) {
      const inputData = prepareData();

      console.log(landmarksData);
      console.log(inputData);

      if (model) {
        const prediction = model.predict(inputData) as tf.Tensor;
        console.log(prediction);
      }
    }
  }, [landmarksData]);

  useEffect(() => {
    // Load your model here
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel(
        "https://prototipo-lsch.s3.us-east-2.amazonaws.com/model/model.json",
      );
      setModel(loadedModel);
    };

    console.log(tf.version.tfjs);

    loadModel();
  }, []);

  return (
    <div className="App">
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 1200,
          height: 800,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 1200,
          height: 800,
        }}
      />
    </div>
  );
}

export default Recorder;
