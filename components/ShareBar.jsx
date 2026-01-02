"use client";

import { useEffect, useMemo, useState } from "react";
import { Share2, Linkedin, Twitter, Link as LinkIcon, Check } from "lucide-react";
import { track as gaTrack } from "@/lib/track";

export default function ShareBar({ slug, title, source = "blog_sharebar" }) {
  const [mounted, setMounted] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(`/blog/${slug}`);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setCurrentUrl(window.location.href);
    } catch {
      // keep relative
    }
  }, [slug]);

  const tweetUrl = useMemo(() => {
    const t = title || "Read this";
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(
      currentUrl
    )}`;
  }, [title, currentUrl]);

  const linkedinUrl = useMemo(() => {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
  }, [currentUrl]);

  const pageCtx = () => {
    if (typeof window === "undefined") return { source, slug };
    return {
      source,
      slug,
      page_path: window.location.pathname,
      page_url: window.location.href,
    };
  };

  const onShareClick = (platform, url) => {
    if (!mounted) return;
    gaTrack("share_click", {
      ...pageCtx(),
      platform,
      share_url: url,
      target_url: currentUrl,
      title: title || "",
    });
  };

  const copy = async () => {
    if (!mounted) return;

    gaTrack("share_copy", {
      ...pageCtx(),
      target_url: currentUrl,
      title: title || "",
    });

    const toast = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    };

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentUrl);
        toast();
        return;
      }
    } catch {}

    // last fallback
    try {
      const ta = document.createElement("textarea");
      ta.value = currentUrl;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      ta.style.left = "-1000px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      toast();
    } catch {}
  };

  const ABtn = ({ href, onClick, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="text-sm rounded-md border border-white/10 px-3 py-1.5 hover:bg-white/10 inline-flex items-center gap-2"
    >
      {children}
    </a>
  );

  const Btn = ({ onClick, children }) => (
    <button
      type="button"
      onClick={onClick}
      className="text-sm rounded-md border border-white/10 px-3 py-1.5 hover:bg-white/10 inline-flex items-center gap-2"
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-slate-400 inline-flex items-center gap-2">
        <Share2 className="h-4 w-4" /> Share
      </span>

      <ABtn
        href={tweetUrl}
        onClick={() => onShareClick("x", tweetUrl)}
      >
        <Twitter className="h-4 w-4" /> X/Twitter
      </ABtn>

      <ABtn
        href={linkedinUrl}
        onClick={() => onShareClick("linkedin", linkedinUrl)}
      >
        <Linkedin className="h-4 w-4" /> LinkedIn
      </ABtn>

      <Btn onClick={copy}>
        {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
        {copied ? "Copied" : "Copy link"}
      </Btn>
    </div>
  );
}
