"use client";

import { useEffect, useRef } from "react";
import MuxPlayer from "@mux/mux-player-react";

import type { AutoplayMuxVideoProps } from "@/app/types/types";

export function AutoplayMuxVideo({
  playbackId,
  className = "",
  containerStyle,
  playerStyle,
  muted = true,
  loop = true,
  autoPlay = true,
  playsInline = true,
  preload = "auto",
  disablePointerEvents = true,
  videoId,
  videoTitle,
  viewerUserId,
}: AutoplayMuxVideoProps) {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const attemptPlay = async () => {
      try {
        await player.play();
      } catch (err) {
        // Autoplay can be blocked by the browser if not muted, etc.
        console.warn("Autoplay prevented:", err);
      }
    };

    attemptPlay();
  }, [playbackId]);

  return (
    <div
      className={`relative mux-bg w-full max-w-3xl rounded-[10px] bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] ${className}`}
      style={{
        overflow: "hidden",
        aspectRatio: "16 / 9",
        ...containerStyle,
      }}
    >
      <MuxPlayer
        ref={playerRef}
        playbackId={playbackId}
        muted={muted}
        loop={loop}
        autoPlay={autoPlay}
        playsInline={playsInline}
        preload={preload}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          ...(disablePointerEvents ? { pointerEvents: "none" as const } : {}),
          ...playerStyle,
        }}
        metadata={{
          video_id: {videoId},
          video_title: {videoTitle},
          viewer_user_id: {viewerUserId},
        }}
      />
    </div>
  );
}
