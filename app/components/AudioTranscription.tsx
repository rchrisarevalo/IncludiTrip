import { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { handleAudioInput } from "../services/transcribeAudio";
import recording from "../images/recording.png";

const AudioTranscription = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { audio: true }
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const transcription = await handleAudioInput(audioFile);

      console.log(transcription);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStopRecording = async () => {
    stopRecording();
    setIsRecording(false);

    if (mediaBlobUrl) {
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();
      const file = new File([blob], "audio.wav", {
        type: "audio/wav",
      });
      setAudioFile(file);
    }
  };

  const handleStartRecording = () => {
    startRecording();
    setIsRecording(true);
  };

  const handleDeleteAudio = () => {
    setAudioFile(null);
  };

  const handleSaveAudio = async () => {
    if (audioFile) {
      try {
        const transcription = await handleAudioInput(audioFile);
        console.log("Transcription: ", transcription);
      } catch (error) {
        console.error("Error transcribing audio: ", error);
      }
    }
  };

  useEffect(() => {
    const fetchAudioFile = async () => {
      if (mediaBlobUrl) {
        const response = await fetch(mediaBlobUrl);
        const blob = await response.blob();
        const file = new File([blob], "audio.wav", {
          type: "audio/wav",
        });
        setAudioFile(file);
      }
    };
    fetchAudioFile();
  }, [mediaBlobUrl]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        {audioFile && <button type="submit">Transcribe</button>}
      </form>
      <div>
        <div>
          <button onClick={handleStartRecording}>Start Recording</button>
        </div>
        <div>
          <button onClick={handleStopRecording}>Stop Recording</button>
        </div>
        {isRecording && (
          <img
            src={recording.src}
            alt="Recording"
            style={{ width: "15%", maxWidth: "600px", height: "auto" }}
          />
        )}
        {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
      </div>
      {audioFile && (
        <div>
          <h2>Audio File</h2>
          <div>
            <button onClick={handleDeleteAudio}>Delete Audio</button>
          </div>
          <div>
            <button onClick={handleSaveAudio}>Save Audio</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioTranscription;
