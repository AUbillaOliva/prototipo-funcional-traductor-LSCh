import React from "react";
import { UseRecordWebcam, useRecordWebcam } from "react-record-webcam";
import { RecorderContainer } from "./recorder.styled";

const Recorder = () => {
  const {
    createRecording,
    openCamera,
    startRecording,
    stopRecording,
    download,
    activeRecordings,
  }: UseRecordWebcam = useRecordWebcam();

  const recordVideo = async () => {
    const recording: any = await createRecording();
    await openCamera(recording.id);
    await startRecording(recording.id);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Record for 3 seconds
    await stopRecording(recording.id);
    await download(recording.id);

    // Get download file
    const downloadFile = recording.blob;

    // Pass to tensorflow model
    // const model = await tf.loadLayersModel('model.json');
    // const prediction = model.predict(downloadFile);
    // console.log(prediction);
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
