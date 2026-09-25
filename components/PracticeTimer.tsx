"use client";

import { useEffect, useState } from "react";
import type { Practice } from "../types/content";

function displayTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}

export function PracticeTimer({ practice }: { practice: Practice }) {
  const totalSeconds = practice.durationMinutes * 60;
  const [remaining, setRemaining] = useState(totalSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [running, remaining]);

  useEffect(() => {
    if (remaining === 0) setRunning(false);
  }, [remaining]);

  const progress = ((totalSeconds - remaining) / totalSeconds) * 100;

  return (
    <div className="practice-timer">
      <div className="practice-timer__dial" style={{ "--progress": `${progress}%` } as React.CSSProperties}>
        <span>{displayTime(remaining)}</span>
        <small>remaining</small>
      </div>
      <div className="practice-timer__actions">
        <button className="button button--primary" type="button" onClick={() => setRunning((value) => !value)}>
          {running ? "Pause session" : remaining === totalSeconds ? "Begin session" : "Resume session"}
        </button>
        <button className="button button--quiet" type="button" onClick={() => { setRemaining(totalSeconds); setRunning(false); }}>
          Reset
        </button>
      </div>
    </div>
  );
}
