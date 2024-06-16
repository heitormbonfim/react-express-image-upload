import React, { useState, useRef, DragEvent } from "react";

export function ImageUploader() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    const validFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    setSelectedFiles(validFiles);
    const filePreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("No files selected");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));

    try {
      const response = await fetch("http://localhost:5000/api/uploads", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Upload successful");
        setSelectedFiles([]);
        setPreviews([]);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="border-dashed border-4 border-gray-400 p-6 w-96 text-center cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {selectedFiles.length === 0 ? (
          <p>Drag & drop images here, or click to select files</p>
        ) : (
          <p>{selectedFiles.length} file(s) selected</p>
        )}
      </div>
      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div className="mt-4">
        {previews.map((preview, index) => (
          <div key={index} className="mb-2 flex flex-col items-center">
            <img src={preview} alt={`Preview ${index}`} className="h-32 mb-2" />
            <p>{selectedFiles[index].name}</p>
          </div>
        ))}
      </div>
      <button onClick={handleUpload} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Upload
      </button>
    </div>
  );
}
