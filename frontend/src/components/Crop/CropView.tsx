import { Box, Snackbar, Alert } from "@mui/material";
import SettingsPanel from "../Settings/SettingsPanel";
import ImageCropArea from "./ImageCropArea";
import CropControls from "./CropControls";
import { useLocation, useNavigate } from "react-router-dom";
import { useCropLogic } from "../../hooks/useCropLogic";
import { useEffect } from "react";

export const CropView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file as File;

  useEffect(() => {
    // Check if file & blob URL actually work, not just if they exist
    if (!file || !location.state?.imageURL) {
      navigate("/upload", { replace: true });
      return;
    }

    // Test if blob URL is still valid after reload
    fetch(location.state.imageURL)
      .then((response) => {
        if (!response.ok) throw new Error("Blob dead");
      })
      .catch(() => {
        navigate("/upload", { replace: true });
      });
  }, [location, navigate]);

  const { refs, state, handlers } = useCropLogic(file);

  return (
    <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
      <Box sx={{ width: 320, flexShrink: 0 }}>
        <SettingsPanel
          crop={state.crop}
          onCropChange={handlers.handleCropChange}
          logoEnabled={state.logoEnabled}
          setLogoEnabled={handlers.handleLogoEnabledChange}
          logoFile={state.logoFile}
          setLogoFile={state.setLogoFile}
          logoPosition={state.logoPosition}
          setLogoPosition={state.setLogoPosition}
          logoScale={state.logoScale}
          setLogoScale={state.setLogoScale}
          onSaveLogo={handlers.handleSaveLogo}
          onGenerate={handlers.handleGenerate}
          loading={state.loading}
          savedConfigId={state.savedConfigId}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          position: "relative",
        }}
      >
        <ImageCropArea
          imgRef={refs.imgRef}
          canvasRef={refs.canvasRef}
          imageURL={URL.createObjectURL(file)}
          crop={state.crop}
          logoEnabled={state.logoEnabled}
          logoFile={state.logoFile}
          previewMode={state.previewMode}
          previewUrl={state.previewUrl}
          onImageLoaded={handlers.onImageLoaded}
          onCropChange={handlers.handleCropChange}
        />

        <CropControls
          crop={state.crop}
          imageDimensions={state.imageDimensions}
          previewMode={state.previewMode}
          loading={state.loading}
          savedConfigId={state.savedConfigId}
          onPreview={handlers.handlePreview}
          onBackToCrop={handlers.handleBackToCrop}
          convertToOriginalCoordinates={handlers.convertToOriginalCoordinates}
        />
      </Box>

      <Snackbar
        open={state.snackbar.open}
        autoHideDuration={4000}
        onClose={() => handlers.setSnackbar({ ...state.snackbar, open: false })}
      >
        <Alert severity={state.snackbar.severity}>
          {state.snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CropView;
