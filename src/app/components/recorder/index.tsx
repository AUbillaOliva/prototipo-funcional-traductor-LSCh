import React, { useState } from "react";
import { UseRecordWebcam, useRecordWebcam } from "react-record-webcam";
import { RecorderContainer } from "./recorder.styled";
import { Button } from "react-bootstrap";

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const {
    createRecording,
    openCamera,
    startRecording,
    stopRecording,
    download,
    activeRecordings,
  }: UseRecordWebcam = useRecordWebcam();

  const recordVideo = async () => {
    setIsRecording(true);
    const recording: any = await createRecording();
    await openCamera(recording.id);
    await startRecording(recording.id);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Record for 3 seconds
    await stopRecording(recording.id);
    await download(recording.id);
    setIsRecording(false);

    // Get download file
    const downloadFile = recording.blob;

    // Pass to tensorflow model
    // const model = await tf.loadLayersModel('model.json');
    // const prediction = model.predict(downloadFile);
    // console.log(prediction);
  };

  return (
    <RecorderContainer>
      <div className="col">
        <div className="row">
          <Button onClick={recordVideo}>Grabar</Button>
        </div>
      </div>
      {activeRecordings.map((recording) => (
        <div key={recording.id}>
          {
            recording.webcamRef !== null && (
              <video id="recorder-player" ref={recording.webcamRef} autoPlay />
            )
          }
          {
            recording.previewRef !== null && (
              <video id="preview-player" ref={recording.previewRef} autoPlay loop />
            )
          }
        </div>
      ))}
    </RecorderContainer>
  );
};

export default Recorder;
