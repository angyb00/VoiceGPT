import './App.css';
import AudioRecorder from './components/AudioRecorder';
import { Button } from 'react-bootstrap';
import React, { useState } from 'react';

function App() {

  const [audioFile, setAudioFile] = useState(null);


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
          <div className='upload-file-button'>
            <Button>Upload Audio File</Button>
          </div>
      </div>
    </div>
  );
}

export default App;
