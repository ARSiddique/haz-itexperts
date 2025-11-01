"use client";

import { useState, useMemo } from "react";

// gradient placeholder (no network)
const GRADIENT_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90' preserveAspectRatio='none'>
  <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
    <stop offset='0' stop-color='#00E5FF'/><stop offset='1' stop-color='#FF00FF'/>
  </linearGradient></defs>
  <rect width='160' height='90' fill='url(#g)' opacity='0.20'/>
  <g opacity='0.35'><circle cx='30' cy='25' r='8' fill='#00E5FF'/><circle cx='130' cy='70' r='10' fill='#FF00FF'/></g>
  <rect x='6' y='6' width='148' height='78' rx='12' fill='none' stroke='#a5f3fc' stroke-opacity='0.25'/>
</svg>`);

/**
 * Native <img> fallback to avoid Next/Image 404 errors.
 * fill=true → absolutely fills parent with object-cover.
 */
export default function ImageFallback({ src, alt, className = "", fill = true, style, ...rest }) {
  const [current, setCurrent] = useState(src || GRADIENT_FALLBACK);

  const mergedStyle = useMemo(() => {
    const base = fill
      ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
      : {};
    return { ...base, ...style };
  }, [fill, style]);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      style={mergedStyle}
      onError={() => current !== GRADIENT_FALLBACK && setCurrent(GRADIENT_FALLBACK)}
      {...rest}
    />
  );
}
