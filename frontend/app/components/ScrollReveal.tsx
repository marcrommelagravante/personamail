"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distancePx?: number;
  scale?: number;
  durationMs?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
  distancePx = 32,
  scale = 0.95,
  durationMs = 500,
  once = false,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    return prefersReducedMotion || typeof IntersectionObserver === "undefined";
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [once]);

  const getTransform = () => {
    if (isVisible) return "translate(0px, 0px) scale(1)";
    let x = 0;
    let y = 0;
    if (direction === "up") y = distancePx;
    if (direction === "down") y = -distancePx;
    if (direction === "left") x = distancePx;
    if (direction === "right") x = -distancePx;
    return `translate(${x}px, ${y}px) scale(${scale})`;
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: "opacity, transform",
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delayMs}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
