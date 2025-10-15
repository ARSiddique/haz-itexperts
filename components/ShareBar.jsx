"use client";

import { useEffect, useMemo, useState } from "react";
import { Share2, Linkedin, Twitter, Link as LinkIcon } from "lucide-react";

export default function ShareBar({ slug, title }) {
  const [mounted, setMounted] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(`/blog/${slug}`); // SSR-safe relative

  useEffect(() => {
    setMounted(true);
    try {
      setCurrentUrl(window.location.href);
    } catch {
      /* noop – stays relative on SSR */
    }
  }, [slug]);

  const tweetUrl = useMemo(() => (
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`
  ), [title, currentUrl]);

  const linkedinUrl = useMemo(() => (
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
  ), [currentUrl]);

  const open = (url) => {
    // only run on client after mount
    if (!mounted) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const Btn = ({ onClick, children }) => (
    <button
      type="button"
      onClick={onClick}
      className="text-sm rounded-md border border-white/10 px-3 py-1.5 hover:bg-white/10 inline-flex items-center gap-2"
    >
      {children}
    </button>
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert("Link copied 👍");
    } catch {
      // tiny fallback
      const ta = document.createElement("textarea");
      ta.value = currentUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      alert("Link copied 👍");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-slate-400 inline-flex items-center gap-2">
        <Share2 className="h-4 w-4" /> Share
      </span>

      <Btn onClick={() => open(tweetUrl)}>
        <Twitter className="h-4 w-4" /> X/Twitter
      </Btn>

      <Btn onClick={() => open(linkedinUrl)}>
        <Linkedin className="h-4 w-4" /> LinkedIn
      </Btn>

      <Btn onClick={copy}>
        <LinkIcon className="h-4 w-4" /> Copy link
      </Btn>
    </div>
  );
}
