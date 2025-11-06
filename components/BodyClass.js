"use client";
import { useEffect } from "react";

/**
 * Adds a CSS class to <body> while this component is mounted.
 * Use to toggle layout chrome (header/footer) on specific pages.
 */
export default function BodyClass({ name }) {
  useEffect(() => {
    if (!name) return;
    document.body.classList.add(name);
    return () => document.body.classList.remove(name);
  }, [name]);
  return null;
}
