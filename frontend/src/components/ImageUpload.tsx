import { useState, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { Folder } from "@mui/icons-material";

const ImageUpload = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        setError("Only PNG files are allowed. Please select a PNG image.");
        return;
      }

      const selected = acceptedFiles[0];
      if (!selected) return;

      navigate("/crop", {
        state: {
          file: selected,
          imageURL: URL.createObjectURL(selected),
        },
      });
    },
    [navigate]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
    },
    maxFiles: 1,
    noClick: true,
  });

  const handleDropzoneClick = () => {
    setError(null);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      px={2}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          minHeight: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box>
          {error && (
            <Box
              sx={{
                backgroundColor: "error.light",
                color: "error.contrastText",
                p: 2,
                borderRadius: 1,
                mb: 2,
                textAlign: "center",
              }}
            >
              {error}
            </Box>
          )}

          <Box
            {...getRootProps()}
            onClick={handleDropzoneClick}
            sx={{
              border: "2px dashed",
              borderColor: isDragActive ? "primary.main" : "#ccc",
              backgroundColor: isDragActive
                ? "action.hover"
                : "background.paper",
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "action.hover",
              },
            }}
          >
            <input {...getInputProps()} />
            <Box
              sx={{
                fontSize: 48,
                color: "primary.main",
                mb: 2,
              }}
            >
              <Folder
                sx={{
                  fontSize: 64,
                  color: "grey.500",
                  mb: 2,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                }}
              />
            </Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {isDragActive
                ? "Drop the image here..."
                : "Drag & Drop your PNG image"}
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              or click to browse images
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={2}
            >
              Supported format: PNG only
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                setError(null);
                open();
              }}
            >
              Browse Images
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageUpload;
