import React from "react";
import { Box } from "@mui/material";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropAreaProps {
  imgRef: React.RefObject<HTMLImageElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;

  imageURL: string;
  crop: Crop;
  logoEnabled: boolean;
  logoFile: File | null;
  previewMode: boolean;
  previewUrl: string | null;
  onImageLoaded: (img: HTMLImageElement) => void;
  onCropChange: (crop: Crop) => void;
}

const ImageCropArea = ({
  imgRef,
  canvasRef,
  imageURL,
  crop,
  logoEnabled,
  logoFile,
  previewMode,
  previewUrl,
  onImageLoaded,
  onCropChange,
}: ImageCropAreaProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "calc(100% - 40px)",
        maxHeight: "calc(100vh - 200px)",
        position: "relative",
      }}
    >
      {!previewMode ? (
        <>
          <ReactCrop crop={crop} onChange={onCropChange} keepSelection>
            <img
              ref={imgRef}
              src={imageURL}
              onLoad={(e) => onImageLoaded(e.currentTarget)}
              style={{
                maxWidth: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
                display: "block",
              }}
              alt="Image to crop"
            />
          </ReactCrop>

          {logoEnabled && logoFile && (
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: crop.y,
                left: crop.x,
                width: crop.width,
                height: crop.height,
                pointerEvents: "none",
                border: "2px dashed #fff",
              }}
              width={crop.width}
              height={crop.height}
            />
          )}
        </>
      ) : (
        previewUrl && (
          <img
            src={previewUrl}
            style={{
              maxWidth: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
              display: "block",
            }}
            alt="Preview result"
          />
        )
      )}
    </Box>
  );
};

export default ImageCropArea;
