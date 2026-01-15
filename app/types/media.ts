export type AutoplayMuxVideoProps = {
  playbackId: string;
  thumbnailTime?: number;

  /** Wrapper styling (Tailwind) */
  className?: string;

  /** Wrapper inline styles (e.g., aspectRatio, overflow, etc.) */
  containerStyle?: React.CSSProperties;

  /** Player inline styles (positioning/crop/scale) */
  playerStyle?: React.CSSProperties;

  /** Common controls */
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  preload?: "auto" | "metadata" | "none";

  /** Turn off all user interaction (recommended for hero backgrounds) */
  disablePointerEvents?: boolean;

  // Metadata
  videoId?: string;
  videoTitle?: string;
  viewerUserId?: string;
};
