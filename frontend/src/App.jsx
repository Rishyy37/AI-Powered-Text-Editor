import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './index.css';

// Import components
import Editor from './components/Editor';
import Controls from './components/Controls';

export default function App() {
  const [text, setText] = useState('');
  const [toneLevel, setToneLevel] = useState(50);
  const [sliderValue, setSliderValue] = useState(50);
  const [pendingTone, setPendingTone] = useState(50);
  const [isSliderActive, setIsSliderActive] = useState(false);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load saved text from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('toneText');
    if (saved) setText(saved);
  }, []);

  // Save text to localStorage
  useEffect(() => {
    localStorage.setItem('toneText', text);
  }, [text]);

  // Handle tone adjustment
  const handleToneChange = async (newTone) => {
    setToneLevel(newTone);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3001/tone-adjust', {
        text,
        toneLevel: newTone,
      });
      setHistory([...history, { text, tone: toneLevel }]);
      setText(response.data.result);
      setToneLevel(newTone);
      setFuture([]);
    } catch (err) {
      setError('Failed to adjust tone.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Go button
  const handleGo = () => {
    if (text.trim() === '') {
      window.alert("Please enter some text before adjusting the tone.");
      return;
    }
    setSliderValue(pendingTone);
    handleToneChange(pendingTone);
  };

  // Undo
  const handleUndo = () => {

    console.log("Undo : ",history.length)
    if (!history.length || history.length == 1){
      window.alert("Please enter some text before adjusting the tone.");
      return;
    } 
    
    const prev = history[history.length - 1];
    setFuture([{ text, tone: toneLevel }, ...future]);
    setText(prev.text);
    setPendingTone(prev.tone);
    setSliderValue(prev.tone);
    setToneLevel(prev.tone);
    setHistory(history.slice(0, -1));
  };

  // Redo
  const handleRedo = () => {
    console.log("Redo : ",history.length)
    if (text.trim() === '') {
      window.alert("Please enter some text before adjusting the tone.");
      return;
    }
    if (!future.length) return;
    const next = future[0];
    
    setHistory([...history, { text, tone: toneLevel }]);
    setText(next.text);
    setPendingTone(next.tone);
    setSliderValue(next.tone);
    setToneLevel(next.tone);
    setFuture(future.slice(1));
  };

  // Reset
  const handleReset = () => {
    if(text.trim() === ''){
      window.alert("Please enter some text before adjusting the tone.");
      return;
    }
    setHistory([...history, { text, tone: toneLevel }]);
    setText('');
    setToneLevel(50);
    setSliderValue(50);
    setPendingTone(50);
    setFuture([]);
  };

  return (
    <div className="app">
      <Editor text={text} setText={setText} error={error} />
      <Controls
        pendingTone={pendingTone}
        setPendingTone={setPendingTone}
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        isSliderActive={isSliderActive}
        setIsSliderActive={setIsSliderActive}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        onGo={handleGo}
        canUndo={history.length > 0}
        canRedo={future.length > 0}
        loading={loading}
      />
    </div>
  );
}
