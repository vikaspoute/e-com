import { Label } from "@radix-ui/react-label";
import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  imageUrl,
  setImageUrl,
  imageLoadingState,
  setImageLoadingState,
}) => {
  const inputRef = useRef(null);
  function handelImageFileChange(event) {
    console.log(event.target.files);
    const selectedImageFile = event.target.files?.[0];
    if (selectedImageFile) setImageFile(selectedImageFile);
  }

  function handelDragOver(event) {
    event.preventDefault();
  }

  function handelDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handelRemoveImage(event) {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("file", imageFile);
    const res = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );
    console.log(res.data);

    if (res?.data?.success) {
      setImageUrl(res?.data?.result);
      setImageLoadingState(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handelDragOver}
        onDrop={handelDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          onChange={handelImageFileChange}
          ref={inputRef}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col justify-center items-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="h-10 w-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <div className="text-sm font-medium">{imageFile.name}</div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handelRemoveImage}
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
