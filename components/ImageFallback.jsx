// components/ImageFallback.jsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageFallback(props) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="bg-slate-800/80 flex items-center justify-center text-xs text-slate-300">
        Image unavailable
      </div>
    );
  }

  return (
    <Image
      {...props}
      onError={() => setError(true)}
    />
  );
}
