"use client";
import Portal from "./Portal";

/**
 * Fixed dock at the bottom. Use align="left" | "right".
 * Everything inside is NOT fixed—docked items avoid stacking/overflow bugs.
 */
export default function FabDock({ align = "right", children }) {
  return (
    <Portal>
      <div className="fixed inset-x-0 bottom-3 z-[100] pointer-events-none px-3 sm:px-4">
        <div className={`mx-auto max-w-6xl ${align === "left" ? "justify-start" : "justify-end"} flex`}>
          <div className="flex gap-2 pointer-events-auto">{children}</div>
        </div>
      </div>
    </Portal>
  );
}
