import './App.css';
import AudioRecorder from './components/AudioRecorder';
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';



function App() {

  const [audioFile, setAudioFile] = useState(null);

  const uploadFileToWhisper = async () => {
    const formData = new FormData();
    formData.append('model', 'whisper-1');
    formData.append('file', audioFile);

    axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(value => {
        console.log(value.data);
    })
    .catch((error) => {
      alert("Error: ", error.response);
    })
  };

  return (
    <div className="App">
      <section>
        <h1 className='App-header'>VoiceGPT</h1>
      </section>
      <div>
        <AudioRecorder/>
      </div>
      <div className='upload-audio-container'>
        <input
          type="file"
          accept='.webm, .mp3, .mp4, .mpeg, mpga, .m4a, .wav'
          onChange={ (event) => { setAudioFile(event.target.files[0]); } } 
          />
          { audioFile !== null && (
            <div className='upload-file-button'>
              <Button onClick={uploadFileToWhisper}>Upload Audio File</Button>
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
