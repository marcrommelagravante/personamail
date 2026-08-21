"use client";

import React from "react";
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";
import ScrollProgress from "./ScrollProgress";

export default function HorizontalScrollTrack({
  children,
}: {
  children: React.ReactNode;
}) {
  const { containerRef, trackRef } = useHorizontalScroll();

  return (
    <div className="relative">
      <ScrollProgress />
      <div
        ref={containerRef}
        className="h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#090c14]"
      >
        <div ref={trackRef} className="flex h-full w-max items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
