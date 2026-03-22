"use client";

import { useState, useCallback, useRef, type DragEvent, type ChangeEvent } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFiles?: (files: FileList) => void;
  accept?: string;
  className?: string;
}

export function UploadZone({ onFiles, accept, className }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onFiles?.(e.target.files);
      }
    },
    [onFiles]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-8 cursor-pointer",
        "rounded-md border-[1.5px] border-dashed transition-all duration-200",
        isDragOver
          ? "border-indigo-400 bg-indigo-50"
          : "border-[rgba(0,0,0,0.12)] bg-surface-1 hover:border-indigo-200 hover:bg-indigo-50/30",
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        multiple
      />
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
