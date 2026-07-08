"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(value || "");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setPreview(url);
        onChange(url);
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview("");
    onChange("");
  };

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl transition-all cursor-pointer overflow-hidden ${
          isDragActive
            ? "border-brand-500 bg-brand-50"
            : "border-neutral-200 bg-neutral-50 hover:border-neutral-300 hover:bg-neutral-100"
        }`}
      >
        <input {...getInputProps()} />
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-44 w-full"
            >
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized={preview.startsWith("data:")}
              />
              <button
                onClick={clear}
                className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-36 gap-2 p-4"
            >
              {isDragActive ? (
                <>
                  <Upload className="h-8 w-8 text-brand-500" />
                  <p className="text-sm font-medium text-brand-500">Soltar imagen aquí</p>
                </>
              ) : (
                <>
                  <ImageIcon className="h-8 w-8 text-neutral-300" />
                  <p className="text-sm text-neutral-500">
                    <span className="font-semibold text-brand-500">Clic</span> o arrastrá una imagen
                  </p>
                  <p className="text-xs text-neutral-400">PNG, JPG, WEBP hasta 10 MB</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* URL input fallback */}
      <div className="flex gap-2">
        <input
          type="url"
          placeholder="O pegá una URL de imagen..."
          value={preview.startsWith("data:") ? "" : preview}
          onChange={(e) => { setPreview(e.target.value); onChange(e.target.value); }}
          className="flex-1 h-9 px-3 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        />
      </div>
    </div>
  );
}
