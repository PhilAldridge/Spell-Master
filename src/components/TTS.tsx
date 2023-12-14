import { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { TextToSpeech as TTSCapacitor } from '@capacitor-community/text-to-speech';

const TextToSpeech = ({ text }:{text:string}) => {
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance>();

  useEffect(() => {
    if(Capacitor.isNativePlatform()) {
      const speakFirst =async () => {
        
      await TTSCapacitor.speak({
        text: text,
        lang: 'en-US',
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient',
      })}
      speakFirst()
    } else {
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
    }
    
  }, [text]);

  const speak = async () => {
    await TTSCapacitor.speak({
      text: text,
      lang: 'en-US',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient',
    });
  };

  const handlePlay = () => {
    if(Capacitor.isNativePlatform()) {
      speak();
    } else {
      if(!utterance) return
      const synth = window.speechSynthesis;
      utterance.voice = synth.getVoices()[5];
      if(!synth.speaking){
        synth.speak(utterance as SpeechSynthesisUtterance);
      }
    }
  };
  return (
      <button onClick={handlePlay}>&#x1F50A;</button>
  );
};

export default TextToSpeech;