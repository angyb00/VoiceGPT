import './App.css';
import AudioRecorder from './components/AudioRecorder';
import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import OpenAI from 'openai';



function App() {

  const openai = new OpenAI();
  const [audioFile, setAudioFile] = useState(null);
  const [audioText, setAudioText] = useState("");

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
      setAudioText(value.data.text);
    })
    .catch((error) => {
      alert("Error: ", error.response);
    })
  };

  const uploadPromptToChat = async () => {
    openai.chat.completions.create({
      messages: [{"role": "user", "content": "What is 2+2?"}],
      model: "gpt-3.5-turbo"
    })
    .then(res => {
      console.log(res.data)
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
              <Button onClick={uploadPromptToChat}>Upload Audio File</Button>
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
