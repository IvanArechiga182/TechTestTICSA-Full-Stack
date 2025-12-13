import { useEffect, useState } from "react";

export function useUploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    const validTypes = ["application/pdf", "image/jpeg"];

    if (!validTypes.includes(selectedFile.type)) {
      setErrorMessage("Invalid file type. Please select a PDF or JPG file.");
      setFile(null);
      return;
    }

    setErrorMessage("");
    setFile(selectedFile);
  };

  const resetUpload = () => {
    setPreviewUrl(null);
    setFile(null);
    setErrorMessage(null);
  };

  useEffect(() => {
    if (!file) return;

    let active = true;
    const objectUrl = URL.createObjectURL(file);

    if (active) {
      setPreviewUrl(objectUrl);
    }

    return () => {
      active = false;
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return {
    file,
    previewUrl,
    errorMessage,
    handleFileChange,
    resetUpload,
  };
}
