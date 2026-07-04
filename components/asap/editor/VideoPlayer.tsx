"use client";

import React, { useRef, useEffect, useState } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, SkipBack, SkipForward, AlertCircle } from "lucide-react";
import { ProjectInfo } from "@/types/asap";

interface VideoPlayerProps {
  project: ProjectInfo;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  videoUrl: string;
}

export default function VideoPlayer({ 
  project, 
  isPlaying, 
  setIsPlaying, 
  currentTime, 
  setCurrentTime,
  videoUrl 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Sync isPlaying state to video element
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(err => {
        console.warn("Autoplay/play failed:", err);
        setIsPlaying(false);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  // Sync currentTime to video element when changed from outside (scrubbing)
  // To avoid circular updates, only sync if the difference is substantial (> 0.25s)
  useEffect(() => {
    if (!videoRef.current) return;
    const diff = Math.abs(videoRef.current.currentTime - currentTime);
    if (diff > 0.3) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  // Periodic timer to sync video's time back to timeline when playing
  useEffect(() => {
    if (!videoRef.current) return;
    const interval = setInterval(() => {
      if (videoRef.current && isPlaying) {
        setCurrentTime(videoRef.current.currentTime);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoLoaded = () => {
    setVideoError(null);
  };

  const handleVideoError = () => {
    setVideoError("Failed to stream video. Using interactive simulated canvas background.");
  };

  const skipTime = (amount: number) => {
    if (!videoRef.current) return;
    let newTime = videoRef.current.currentTime + amount;
    if (newTime < 0) newTime = 0;
    if (newTime > project.durationSeconds) newTime = project.durationSeconds;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      videoRef.current.muted = vol === 0;
    }
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMute = !isMuted;
    setIsMuted(newMute);
    videoRef.current.muted = newMute;
    if (newMute) {
      videoRef.current.volume = 0;
    } else {
      videoRef.current.volume = volume;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    const ms = Math.floor((secs % 1) * 100).toString().padStart(2, "0");
    return `${m}:${s}.${ms}`;
  };

  // Determine aspect ratio class name
  let ratioClass = "aspect-video w-full max-w-4xl"; // 16:9
  if (project.resolution === "9:16") {
    ratioClass = "h-[450px] aspect-[9/16]"; // 9:16 Portrait
  } else if (project.resolution === "1:1") {
    ratioClass = "h-[400px] aspect-square"; // 1:1 Square
  }

  return (
    <div id="video-preview-canvas" className="flex-1 flex flex-col p-6 items-center justify-center bg-[#060e20] relative overflow-hidden select-none min-h-[350px]">
      
      {/* Aspect Ratio Outer Frame Wrapper */}
      <div className={`relative ${ratioClass} bg-black rounded-xl overflow-hidden shadow-2xl shadow-black/80 border border-white/5 transition-all duration-300 group`}>
        
        {/* Real Video Elements */}
        {!videoError ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleVideoLoaded}
            onError={handleVideoError}
            playsInline
            loop
            muted={isMuted}
          />
        ) : (
          /* Simulated Cinematic Background Image fallback if connection blocked */
          <div className="w-full h-full relative">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-60" 
              alt="Simulated Video View"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4 text-center">
              <AlertCircle size={24} className="text-[#4cd7f6] mb-2" />
              <p className="text-xs text-white max-w-xs">{videoError}</p>
            </div>
          </div>
        )}

        {/* Video Overlays */}
        {/* Playback specifications in the corner */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-mono text-[11px] text-white font-bold tracking-wider">
              {project.quality} | {project.fps} FPS
            </span>
          </div>
        </div>

        {/* Floating Playback controls on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
          <div className="bg-black/80 backdrop-blur-md px-4 py-3 rounded-xl flex items-center justify-between border border-white/10 gap-4">
            
            {/* Play/Pause controls */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => skipTime(-5)} 
                className="text-white hover:text-[#4cd7f6] transition-colors cursor-pointer"
                title="Rewind 5s"
              >
                <SkipBack size={18} />
              </button>
              
              <button 
                onClick={togglePlay} 
                className="w-10 h-10 rounded-full bg-[#d0bcff] text-[#3c0091] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md shadow-[#d0bcff]/20"
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
              </button>

              <button 
                onClick={() => skipTime(5)} 
                className="text-white hover:text-[#4cd7f6] transition-colors cursor-pointer"
                title="Fast Forward 5s"
              >
                <SkipForward size={18} />
              </button>
            </div>

            {/* Time scrub metadata */}
            <div className="font-mono text-xs text-white/90">
              <span className="text-[#4cd7f6] font-bold">{formatTime(currentTime)}</span>
              <span className="opacity-50"> / {formatTime(project.durationSeconds)}</span>
            </div>

            {/* Volume & Audio Controls */}
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMute} 
                className="text-white hover:text-[#4cd7f6] transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05"
                value={isMuted ? 0 : volume} 
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#4cd7f6]" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive AI processing status bar */}
      <div className="absolute bottom-4 left-6 right-6 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#a078ff] to-[#4cd7f6] rounded-full transition-all duration-300"
          style={{ width: `${(currentTime / project.durationSeconds) * 100}%` }}
        />
      </div>
    </div>
  );
}
