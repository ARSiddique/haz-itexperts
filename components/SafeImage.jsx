"use client";
import React from "react";
import Image from "next/image";

export default function SafeImage({ src, alt, ...rest }) {
  const [err, setErr] = React.useState(false);
  return (
    <Image
      src={err ? "/images/illus/fallback.svg" : src}
      alt={alt}
      onError={() => setErr(true)}
      {...rest}
    />
  );
}
