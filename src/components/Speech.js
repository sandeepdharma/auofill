import React, { useEffect, useState } from "react";
import "./Speech.scss";
import { Mic, MicMute } from "react-bootstrap-icons";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Speech = ({ getVoiceRecognitionData }) => {

  const [micActive, setMicActive] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const browserCheck = () => {
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  };

  const startVoiceRecognition = () => {
    SpeechRecognition.startListening();
    setMicActive(!micActive);
    if (transcript) {
        getVoiceRecognitionData(transcript);
      }
  };
  const stopVoiceRecognition = () => {
    SpeechRecognition.stopListening();
    setMicActive(!micActive);
    if (transcript) {
      getVoiceRecognitionData(transcript);
    }
  };
  useEffect(() => {
    browserCheck();
  });
  return (
    <>
      <div className="speech-modal">
        <div className="speech-matter">
          <button onClick={resetTranscript}>Reset</button>
          <p>{transcript}</p>
        </div>
        <div className="speech-icon-container">
          <p>Microphone: {listening ? "on" : "off"}</p>

          {listening ? (
            <i className="bi bi-mic-mute" onClick={stopVoiceRecognition}>
              <Mic className="icon-activate" />
            </i>
          ) : (
            <i className="bi bi-mic" onClick={startVoiceRecognition}>
              <MicMute className="icon-deactivate" />
            </i>
          )}
          
        </div>
      </div>
    </>
  );
};

export default Speech;
