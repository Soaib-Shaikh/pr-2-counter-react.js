import React, { useState, useEffect, useRef } from 'react';
import './Counter.css'; 

const Counter = () => {
  const [time, setTime] = useState(0); 
  const [action, setAction] = useState(""); 
  const intervalRef = useRef(null);

  
  useEffect(() => {
    const savedTime = localStorage.getItem("timerTime");
    const savedAction = localStorage.getItem("timerAction");

    if (savedTime) setTime(parseInt(savedTime, 10));
    if (savedAction) setAction(savedAction === "play" ? "stop" : savedAction); 
  }, []);


  useEffect(() => {
    localStorage.setItem("timerTime", time.toString());
  }, [time]);

  useEffect(() => {
    localStorage.setItem("timerAction", action);
  }, [action]);


  useEffect(() => {
    clearInterval(intervalRef.current);

    if (action === "play") {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10); 
      }, 10);
    }

    if (action === "reset") {
      setTime(0);
    }

    return () => clearInterval(intervalRef.current);
  }, [action])

  const handleAction = (value) => {
    setAction(value);
  };
  
  const formatTime = (timeInMs) => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const hundredths = Math.floor((timeInMs % 1000) / 10); 
    
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');
    const displayHundredths = String(hundredths).padStart(2, '0');

    return `${displayMinutes} : ${displaySeconds} : ${displayHundredths}`;
  };

  
  return (

    <div className="neumorphic-stopwatch-container">
        <h2 className="stopwatch-heading">Stop Watch</h2>
      <div className="neumorphic-display-panel">
        <div className="neumorphic-display-time">
          {formatTime(time)}
        </div>
      </div>

      <div className="neumorphic-buttons-container">
        
        <button 
          onClick={() => handleAction("play")} 
          disabled={action === "play"}
          className="neumorphic-button play-button"
        >
          Play
        </button>

        
        <button 
          onClick={() => handleAction("stop")} 
          disabled={action !== "play" && time === 0} 
          className="neumorphic-button stop-button"
        >
          Stop
        </button>

    
        <button 
          onClick={() => handleAction("reset")} 
          disabled={action === "play" || time === 0}
          className="neumorphic-button reset-button"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;