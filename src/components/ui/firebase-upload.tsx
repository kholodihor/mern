"use client";

import Image from "next/image";
import { type ChangeEvent, type DragEvent, useRef, useState } from "react";
import { uploadFileToStorage } from "@/lib/firebase-storage";

interface FirebaseUploadProps {
  onChange: (urls: string[]) => void;
  value?: string[];
  multiple?: boolean;
  folder: string; // 'gallery' or 'news'
}

const FirebaseUpload = ({
  onChange,
  value = [],
  multiple = true,
  folder,
}: FirebaseUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<number | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploadPromises: Promise<string>[] = [];
      const totalFiles = files.length;
      let completedFiles = 0;

      // Create an array of upload promises
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${file.name.split(".").pop()}`;

        const uploadPromise = uploadFileToStorage(file, path).then((url) => {
          completedFiles++;
          setUploadProgress(Math.round((completedFiles / totalFiles) * 100));
          return url;
        });

        uploadPromises.push(uploadPromise);
      }

      // Wait for all uploads to complete
      const urls = await Promise.all(uploadPromises);

      // Update state with new URLs - add new images at the beginning
      const newUrls = multiple ? [...urls, ...uploadedFiles] : urls;
      setUploadedFiles(newUrls);
      onChange(newUrls);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const removeImage = (indexToRemove: number) => {
    if (confirm("Are you sure you want to remove this image?")) {
      const newUrls = uploadedFiles.filter(
        (_, index) => index !== indexToRemove,
      );
      setUploadedFiles(newUrls);
      onChange(newUrls);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setDraggedOverItem(index);
  };

  const handleDragEnd = () => {
    if (
      draggedItem !== null &&
      draggedOverItem !== null &&
      draggedItem !== draggedOverItem
    ) {
      const newUrls = [...uploadedFiles];
      const draggedItemValue = newUrls[draggedItem];

      // Remove the dragged item
      newUrls.splice(draggedItem, 1);

      // Insert it at the new position
      newUrls.splice(draggedOverItem, 0, draggedItemValue);

      setUploadedFiles(newUrls);
      onChange(newUrls);
    }

    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <label
          htmlFor="firebase-upload"
          className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Uploading... {uploadProgress}%</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                />
              </svg>
              <span>Select Files</span>
            </>
          )}
        </label>
        <input
          id="firebase-upload"
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
          ref={fileInputRef}
        />

        {isUploading && (
          <div className="mt-3">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300 ease-in-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {uploadProgress}% complete
            </p>
          </div>
        )}
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="mb-2 font-medium">
            Uploaded Images:{" "}
            <span className="ml-2 text-xs text-gray-500">
              (Drag to reorder)
            </span>
          </h4>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {uploadedFiles.map((url, index) => (
              <div
                key={url}
                role="img"
                className={`group relative ${draggedItem === index ? "scale-105 opacity-50" : ""} ${draggedOverItem === index ? "rounded-md ring-2 ring-blue-500" : ""}`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                aria-label={`Uploaded image ${index + 1}, draggable to reorder`}
              >
                {/* Drag handle */}
                <div className="absolute -left-1 -top-1 z-10 flex h-5 w-5 cursor-move items-center justify-center rounded-full bg-gray-100 text-gray-500 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                </div>
                <div className="relative h-24 w-24 overflow-hidden rounded-md border border-gray-200 shadow-sm transition-all hover:shadow-md">
                  <Image
                    src={url}
                    alt={`Uploaded ${index + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-90"
                    loading="lazy"
                    onError={(e) => {
                      console.error(`Error loading image: ${url}`);
                      // Fallback to a placeholder if image fails to load
                      e.currentTarget.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"%3E%3Cpath fill="%23ccc" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white opacity-70 shadow-md transition-all group-hover:opacity-100 hover:scale-110 hover:bg-red-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:opacity-50"
                  title="Remove image"
                  aria-label="Remove image"
                  disabled={isUploading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FirebaseUpload;
