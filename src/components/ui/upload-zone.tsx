"use client";

import { useState, useCallback, type DragEvent } from "react";
import { Upload } from "lucide-react";

interface UploadZoneProps {
  onFiles?: (files: FileList) => void;
  accept?: string;
  className?: string;
}

export function UploadZone({ onFiles, accept, className = "" }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        onFiles?.(e.dataTransfer.files);
      }
    },
    [onFiles]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        flex flex-col items-center justify-center gap-2 p-8
        rounded-md border-[1.5px] border-dashed transition-all duration-200
        ${isDragOver
          ? "border-indigo-400 bg-indigo-50"
          : "border-[rgba(0,0,0,0.12)] bg-surface-1"
        }
        ${className}
      `}
    >
      <Upload
        size={24}
        strokeWidth={1.5}
        className={isDragOver ? "text-indigo-400" : "text-text-tertiary"}
      />
      <div className="text-center">
        <p className="text-sm text-text-primary">Drop files here or click to upload</p>
        <p className="text-[11px] text-text-secondary mt-0.5">
          {accept ? `Accepts: ${accept}` : "Supports CSV, XLS, and TXT files"}
        </p>
      </div>
    </div>
  );
}
