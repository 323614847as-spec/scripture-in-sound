"use client";

import { useEffect, useRef, useState } from "react";
import type { AudioRecording } from "../types/content";
import { StatusLabel } from "./StatusLabel";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ recording }: { recording: AudioRecording }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [speed, setSpeed] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.playbackRate = speed;
  }, [volume, speed]);

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio || !recording.src) return;
    if (audio.paused) {
      await audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <article className="audio-player">
      <div className="audio-player__topline">
        <div>
          <div className="audio-player__meta">
            <span>{recording.type}</span>
            <span aria-hidden="true">·</span>
            <span>{recording.language}</span>
            {recording.traditions?.length ? <><span aria-hidden="true">·</span><span>{recording.traditions.join(" / ")}</span></> : null}
          </div>
          <h3>{recording.title}</h3>
        </div>
        <StatusLabel status={recording.status} />
      </div>

      <p className="audio-player__description">{recording.description}</p>
      {recording.attribution || recording.rights ? <div className="audio-player__credit">{recording.attribution ? <span>{recording.attribution}</span> : null}{recording.rights ? <small>{recording.rights}</small> : null}</div> : null}

      {recording.src ? (
        <>
          <audio
            ref={audioRef}
            src={recording.src}
            preload="metadata"
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onEnded={() => setPlaying(false)}
          />
          <div className="audio-player__controls">
            <button className="play-button" type="button" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
              {playing ? "Pause" : "Play"}
            </button>
            <span className="audio-player__time">{formatTime(currentTime)}</span>
            <label className="sr-only" htmlFor={`seek-${recording.id}`}>Seek through audio</label>
            <input
              id={`seek-${recording.id}`}
              className="audio-player__seek"
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              onChange={(event) => {
                const nextTime = Number(event.target.value);
                if (audioRef.current) audioRef.current.currentTime = nextTime;
                setCurrentTime(nextTime);
              }}
            />
            <span className="audio-player__time">{formatTime(duration)}</span>
          </div>
          <div className="audio-player__secondary">
            <label>
              <span>Volume</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
              />
            </label>
            <label>
              <span>Speed</span>
              <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
                <option value="0.75">0.75×</option>
                <option value="1">1×</option>
                <option value="1.25">1.25×</option>
                <option value="1.5">1.5×</option>
              </select>
            </label>
          </div>
        </>
      ) : (
        <div className="audio-player__empty">Audio file and verified recording credit to be added.</div>
      )}

      {recording.transcript ? (
        <div className="audio-player__transcript">
          <button type="button" onClick={() => setShowTranscript((value) => !value)}>
            {showTranscript ? "Hide transcript" : "Show transcript"}
          </button>
          {showTranscript ? <p>{recording.transcript}</p> : null}
        </div>
      ) : null}
    </article>
  );
}
