import React, { useState, useRef } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  // Start Timer
  const startTimer = () => {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  // Pause Timer
  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Stop Timer
  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setSeconds(0);
  };

  // Restart Timer
  const restartTimer = () => {
    clearInterval(intervalRef.current);

    setSeconds(0);

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  // Format Time
  const formatTime = () => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${mins}:${secs}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{formatTime()}</h1>

      <button onClick={startTimer}>Start</button>

      <button onClick={pauseTimer} style={{ marginLeft: "10px" }}>
        Pause
      </button>

      <button onClick={stopTimer} style={{ marginLeft: "10px" }}>
        Stop
      </button>

      <button onClick={restartTimer} style={{ marginLeft: "10px" }}>
        Restart
      </button>
    </div>
  );
}