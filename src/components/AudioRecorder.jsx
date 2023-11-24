import { useState } from "react";
import { Button } from 'react-bootstrap';


export default function AudioRecorder() {

    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);

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

    return (
        <div>
            <h2>Audio Recorder</h2>
            <div>
                { !permission && (
                            <Button onClick={getMicrophonePermission}>
                                Get Microphone
                            </Button>
                        ) }
                { permission && (
                    <Button>
                        Record
                    </Button>
                ) }
            </div>
        </div>
    )
}