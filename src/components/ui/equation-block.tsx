"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface EquationBlockProps {
  latex: string;
  display?: boolean;
  className?: string;
}

export function EquationBlock({ latex, display = true, className = "" }: EquationBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(latex, ref.current, {
        displayMode: display,
        throwOnError: false,
        output: "html",
      });
    }
  }, [latex, display]);

  return <div ref={ref} className={`eq-block ${className}`} />;
}
