"use client";
import React from "react";
import AudioTranscription from "../components/AudioTranscription";

const TestAudio = () => {
  return (
    <div>
      <h1>Test Audio</h1>
      <h2>Choose to uplaod an audio file or record your own</h2>
      <AudioTranscription />
    </div>
  );
};

export default TestAudio;
