import React, { useEffect, useRef, useState } from "react";
import { UseRecordWebcam, useRecordWebcam } from "react-record-webcam";
import { RecorderContainer } from "./recorder.styled";
import * as tf from "@tensorflow/tfjs";
import { getModelData } from "@/app/helpers/api.helper";
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

const Recorder = () => {
  const {
    createRecording,
    openCamera,
    startRecording,
    stopRecording,
    download,
    activeRecordings,
  }: UseRecordWebcam = useRecordWebcam();

  const [model, setModel] = useState(null);
  const [downloadFile, setDownloadFile] = useState(null);
  const videoRef = useRef(null);
  const [gestureRecognizer, setGestureRecognizer] = useState<any>(null);
  const [webcamRunning, setWebcamRunning] = useState(false);

  const recordVideo = async () => {
    const recording: any = await createRecording();
    await openCamera(recording.id);
    await startRecording(recording.id);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Record for 3 seconds
    await stopRecording(recording.id);
    await download(recording.id);

    // Get download file
    setDownloadFile(recording.blob);
  };

  useEffect(() => {
    getModelData().then((loadedModel: any) => {
      setModel(loadedModel);
      console.log("Model loaded:", loadedModel);
    });

    const createGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      const recognizer: any = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
          delegate: "GPU",
        },
        runningMode: "IMAGE",
      });
      setGestureRecognizer(recognizer);
    };

    createGestureRecognizer();
  }, []);

  useEffect(() => {
    if (downloadFile && model && gestureRecognizer) {
      processVideoWithMediaPipe(downloadFile);
    }
  }, [downloadFile, model, gestureRecognizer]);

  const processVideoWithMediaPipe = async (videoBlob: any) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(videoBlob);
    video.width = 640;
    video.height = 480;
    video.muted = true;

    let landmarksData: any = [];

    const onResults = (results: any) => {
      if (results.landmarks) {
        for (const landmarks of results.landmarks) {
          landmarksData.push(landmarks);
        }
      }
    };

    video.onloadeddata = () => {
      video.play();
      const interval = setInterval(async () => {
        if (gestureRecognizer) {
          const nowInMs = Date.now();
          const results = await gestureRecognizer.recognizeForVideo(
            video,
            nowInMs
          );
          onResults(results);
        }
      }, 100); // Process frame every 100ms

      video.onended = () => {
        clearInterval(interval);
        video.remove();
        if (landmarksData.length > 0) {
          // Format landmarks data to match model input shape
          const formattedData = formatLandmarksData(landmarksData);
          // Make predictions with the model
          const prediction = (model as any).predict(tf.tensor(formattedData));
          console.log("Prediction:", prediction);
        }
      };
    };
  };

  const formatLandmarksData = (landmarksData: any) => {
    // Here, we need to reshape and format the landmarks data
    // to match the input shape (346, 258, 3) required by the model
    // This is a placeholder function and needs proper implementation
    // based on the exact structure of landmarksData and model requirements.
    return landmarksData;
  };

  return (
    <RecorderContainer>
      <button onClick={recordVideo}>Grabar Video</button>
      {activeRecordings.map((recording) => (
        <div key={recording.id}>
          <video ref={recording.webcamRef} autoPlay />
          <video ref={recording.previewRef} autoPlay loop />
        </div>
      ))}
    </RecorderContainer>
  );
};

export default Recorder;
