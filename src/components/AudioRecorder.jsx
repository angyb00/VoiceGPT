import { useEffect } from "react";
import { useState, useRef } from "react";
import { Button } from 'react-bootstrap';
import './AudioRecorder.css';
import axios from "axios";


export default function AudioRecorder({onAudioTextChange}) {

    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const mimeType = "audio/webm";

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    // Whisper only takes Audio files so we need to turn audio blob to .webm file
    const uploadFileToWhisper = async () => {
        const file = new File([audioBlob], "recordedText.webm");
        const formData = new FormData();
        formData.append('model', 'whisper-1');
        formData.append('file', file);
    
        axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(value => {
            onAudioTextChange(prevArray => [...prevArray, value.data.text]);
        })
        .catch((error) => {
          alert("Error: ", error.response);
        })
      };

    const startRecording = async () => {
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { type: mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
           if (typeof event.data === "undefined") return;
           if (event.data.size === 0) return;
           localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
      };

      const stopRecording = () => {
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
           const audioBlob = new Blob(audioChunks, { type: mimeType });
           setAudioBlob(audioBlob);
           setAudioChunks([]);
        };
      };

      // Once we get the audio blob, upload it to file
      useEffect(() => {
        if (audioBlob !== null) {
            uploadFileToWhisper();
        }
      },[audioBlob])

    return (
        <div>
            <h2>Audio Recorder</h2>
            <div>
                { !permission &&  (
                            <Button onClick={getMicrophonePermission}>
                                Get Microphone
                            </Button>
                        ) }
                { permission && recordingStatus === "inactive" && (
                    <Button onClick={startRecording}>
                        Start Recording
                    </Button>
                ) }
                { recordingStatus === "recording" && (
                    <Button onClick={stopRecording}>
                        Stop Recording
                    </Button>
                ) }
            </div>
        </div>
    )
}