import './App.css';
import { Button } from 'react-bootstrap';
import AudioRecorder from './components/AudioRecorder';

function App() {
  return (
    <div className="App">
      <section>
        <h1 className='App-header'>VoiceGPT</h1>
      </section>
      <div>
        <AudioRecorder/>
      </div>
      <div className='upload-audio-button'>
        <Button variant='secondary' size='lg'>
          Upload audio file
        </Button>
      </div>
    </div>
  );
}

export default App;
