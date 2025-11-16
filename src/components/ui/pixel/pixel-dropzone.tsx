"use client";

import { FileText, Image as ImageIcon, UploadCloud, X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

type FileRenderer = (file: File, index: number) => React.ReactNode;

type PixelDropzoneProps = {
  label?: React.ReactNode;
  description?: React.ReactNode;
  helperText?: React.ReactNode;
  hasError?: boolean;
  accept?: string | string[];
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  files?: File[];
  defaultFiles?: File[];
  renderFile?: FileRenderer;
  onFilesChange?: (files: File[]) => void;
  onFileRemove?: (file: File, index: number) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  className?: string;
  dropzoneClassName?: string;
  helperClassName?: string;
};

function normalizeAccept(accept?: string | string[]) {
  if (!accept) return undefined;
  const list = Array.isArray(accept) ? accept : accept.split(",");
  return list.map((entry) => entry.trim()).filter(Boolean);
}

function matchesAccept(file: File, acceptList?: string[]) {
  if (!acceptList?.length) return true;

  return acceptList.some((rule) => {
    if (rule.startsWith(".")) {
      return file.name.toLowerCase().endsWith(rule.toLowerCase());
    }

    if (rule.endsWith("/*")) {
      const prefix = rule.slice(0, -1);
      return file.type.startsWith(prefix.slice(0, -1));
    }

    return file.type === rule;
  });
}

function formatBytes(size: number) {
  if (size === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(size) / Math.log(1024)),
    units.length - 1,
  );
  const value = size / 1024 ** index;
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[index]}`;
}

function defaultFileRenderer(
  onRemove?: (file: File, index: number) => void,
): FileRenderer {
  return (file, index) => (
    <div className="flex items-center justify-between gap-4 border-4 border-black bg-pixel-light-surface px-3 py-2 text-left shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-none dark:border-[#ff8c00] dark:bg-pixel-dark-surface">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-white text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:border-[#ff8c00] dark:bg-transparent dark:text-white">
          {file.type.startsWith("image/") ? (
            <ImageIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <FileText className="h-5 w-5" aria-hidden="true" />
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wide text-black dark:text-white">
            {file.name}
          </p>
          <p className="text-[10px] text-black/60 dark:text-white/60">
            {formatBytes(file.size)}
          </p>
        </div>
      </div>
      {onRemove ? (
        <button
          type="button"
          className="flex items-center gap-1 border-2 border-black bg-black px-2 py-[3px] text-[10px] font-bold uppercase text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-none hover:bg-pixel-dark-surface disabled:pointer-events-none disabled:opacity-50 dark:border-[#ff8c00] dark:bg-[#ff8c00] dark:text-black"
          onClick={() => onRemove(file, index)}
          aria-label={`Remove ${file.name}`}
        >
          <X className="h-3 w-3" aria-hidden="true" />
          Remove
        </button>
      ) : null}
    </div>
  );
}

export const PixelDropzone = React.forwardRef<
  HTMLInputElement,
  PixelDropzoneProps
>(function PixelDropzone(
  {
    label,
    description = "Drag and drop files, or click to browse",
    helperText,
    hasError = false,
    accept,
    maxFiles,
    multiple = true,
    disabled = false,
    files: filesProp,
    defaultFiles = [],
    renderFile,
    onFilesChange,
    onFileRemove,
    inputProps,
    className,
    dropzoneClassName,
    helperClassName,
  },
  forwardedRef,
) {
  const generatedId = React.useId();
  const inputId = inputProps?.id ?? `pixel-dropzone-${generatedId}`;
  const [isDragging, setIsDragging] = React.useState(false);
  const dragCounter = React.useRef(0);
  const [internalFiles, setInternalFiles] =
    React.useState<File[]>(defaultFiles);
  const files = filesProp ?? internalFiles;
  const acceptList = React.useMemo(() => normalizeAccept(accept), [accept]);

  const setFiles = React.useCallback(
    (nextFiles: File[]) => {
      if (!filesProp) {
        setInternalFiles(nextFiles);
      }
      onFilesChange?.(nextFiles);
    },
    [filesProp, onFilesChange],
  );

  const handleNewFiles = React.useCallback(
    (incoming: File[]) => {
      if (disabled) return;
      const filtered = incoming.filter((file) =>
        matchesAccept(file, acceptList),
      );
      if (!filtered.length) return;

      const base = multiple ? [...files, ...filtered] : [filtered[0]];
      const unique = base.filter(
        (file, index, arr) =>
          index ===
          arr.findIndex(
            (candidate) =>
              candidate.name === file.name && candidate.size === file.size,
          ),
      );
      const limited = maxFiles ? unique.slice(0, maxFiles) : unique;

      setFiles(limited);
    },
    [acceptList, disabled, files, maxFiles, multiple, setFiles],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    if (selectedFiles.length) {
      handleNewFiles(selectedFiles);
    }
    // Allow selecting the same file again
    event.target.value = "";
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (disabled) return;
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (disabled) return;
    dragCounter.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (disabled) return;
    dragCounter.current = Math.max(0, dragCounter.current - 1);
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (disabled) return;
    dragCounter.current = 0;
    setIsDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files ?? []);
    handleNewFiles(droppedFiles);
  };

  const handleRemove = (index: number) => {
    if (disabled) return;
    const currentFile = files[index];
    if (!currentFile) return;
    const next = files.filter((_, idx) => idx !== index);
    onFileRemove?.(currentFile, index);
    setFiles(next);
  };

  const previewRenderer: FileRenderer =
    renderFile ?? defaultFileRenderer((_file, index) => handleRemove(index));

  return (
    <div className={cn("space-y-3", className)}>
      {label ? (
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wide text-black dark:text-white">
            {label}
          </p>
          {typeof description === "string" ? (
            <p className="text-xs text-black/70 dark:text-white/70">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      <label
        htmlFor={inputId}
        className={cn(
          "flex min-h-[180px] flex-col items-center justify-center gap-4 border-4 border-dashed border-black bg-pixel-light-surface px-6 py-8 text-center shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-none dark:border-[#ff8c00] dark:bg-pixel-dark-surface",
          isDragging && "border-[#ff8c00] bg-pixel-light-bg dark:bg-[#141414]",
          hasError && "border-destructive",
          disabled && "cursor-not-allowed opacity-60",
          !disabled && "cursor-pointer",
          dropzoneClassName,
        )}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadCloud
          className="h-10 w-10 text-black dark:text-white"
          aria-hidden="true"
        />
        <div className="space-y-1">
          <p className="pixel-font text-sm uppercase text-black dark:text-white">
            Drop files here
          </p>
          <p className="text-xs text-black/70 dark:text-white/70">
            {label && typeof description !== "string"
              ? description
              : "PNG, JPG or GIF up to 10MB"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded border-2 border-black bg-black px-3 py-[3px] text-[10px] font-bold uppercase text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:border-[#ff8c00] dark:bg-[#ff8c00] dark:text-black">
            Click to browse
          </span>
          {maxFiles ? (
            <span className="rounded border-2 border-black bg-white px-3 py-[3px] text-[10px] font-bold uppercase text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:border-[#ff8c00] dark:bg-transparent dark:text-white">
              Max {maxFiles}
            </span>
          ) : null}
        </div>
        {typeof description !== "string" ? description : null}
      </label>

      <input
        id={inputId}
        type="file"
        accept={Array.isArray(accept) ? accept.join(",") : accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
        className="sr-only"
        ref={forwardedRef}
        {...inputProps}
      />

      {files.length ? (
        <div className="space-y-2">
          {files.map((file, index) => (
            <React.Fragment key={`${file.name}-${index}`}>
              {previewRenderer(file, index)}
            </React.Fragment>
          ))}
        </div>
      ) : null}

      {helperText ? (
        <p
          className={cn(
            "text-xs",
            hasError ? "text-destructive" : "text-black/60 dark:text-white/60",
            helperClassName,
          )}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

PixelDropzone.displayName = "PixelDropzone";

PixelDropzone.displayName = "PixelDropzone";
