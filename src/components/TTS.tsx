import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text }:{text:string}) => {
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance>();

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    u.voice = voices[5]
    setUtterance(u);
    if(true /*process.env.NODE_ENV !== 'development'*/){
        synth.speak(u);
    }
    
    return () => {
      synth.cancel();
    };    
  }, [text]);

  

  const handlePlay = () => {
    if(!utterance) return
    const synth = window.speechSynthesis;
    utterance.voice = synth.getVoices()[5];
    if(!synth.speaking){
      synth.speak(utterance as SpeechSynthesisUtterance);
    }
  };
  return (
      <button onClick={handlePlay}>&#x25B6;</button>
  );
};

export default TextToSpeech;