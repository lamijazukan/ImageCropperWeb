import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { type Crop } from "react-image-crop";

interface CropControlsProps {
  crop: Crop;
  imageDimensions: { width: number; height: number };
  previewMode: boolean;
  loading: boolean;
  savedConfigId: string | null;
  onPreview: () => void;
  onBackToCrop: () => void;
  convertToOriginalCoordinates: (crop: Crop) => Crop;
}

const CropControls = ({
  crop,
  imageDimensions,
  previewMode,
  loading,
  savedConfigId,
  onPreview,
  onBackToCrop,
  convertToOriginalCoordinates,
}: CropControlsProps) => {
  const actualCrop = convertToOriginalCoordinates(crop);

  return (
    <>
      {/* Controls */}
      <Box display="flex" gap={2} alignItems="center">
        {!previewMode ? (
          <Button variant="contained" onClick={onPreview} disabled={loading}>
            {loading ? <CircularProgress size={18} /> : "Preview"}
          </Button>
        ) : (
          <Button variant="outlined" onClick={onBackToCrop}>
            Back to Crop
          </Button>
        )}
      </Box>

      {/* Image Info */}
      <Box display="flex" gap={4} justifyContent="center">
        {imageDimensions.width > 0 && (
          <Typography variant="body2" color="text.secondary">
            Original: {imageDimensions.width} × {imageDimensions.height}px
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          Crop: {crop.width} × {crop.height}px (Displayed)
        </Typography>
        {imageDimensions.width > 0 && (
          <Typography variant="body2" color="text.secondary">
            Actual: {actualCrop.width} × {actualCrop.height}px
          </Typography>
        )}
        {savedConfigId && (
          <Typography variant="body2" color="success.main">
            Logo Configured ✓
          </Typography>
        )}
      </Box>
    </>
  );
};

export default CropControls;
