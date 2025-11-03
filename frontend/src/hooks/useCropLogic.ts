import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { type Crop } from "react-image-crop";
import {
  previewImage,
  generateImage,
  configureLogo,
} from "../services/apiServices";
import type { LogoPosition } from "../types/types";

export function useCropLogic(file: File) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [displayedDimensions, setDisplayedDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [initialCrop, setInitialCrop] = useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 200,
    height: 200,
  });
  const [crop, setCrop] = useState<Crop>(initialCrop);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [savedConfigId, setSavedConfigId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const [logoEnabled, setLogoEnabled] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPosition, setLogoPosition] =
    useState<LogoPosition>("bottom-right");
  const [logoScale, setLogoScale] = useState(0.1);

  /**
   * Calculates scale factors between original image dimensions and displayed dimensions
   * Used to convert between screen coordinates and original image coordinates
   * @returns {Object} Scale factors for X and Y axes
   * @returns {number} return.scaleX - Horizontal scale factor (originalWidth / displayedWidth)
   * @returns {number} return.scaleY - Vertical scale factor (originalHeight / displayedHeight)
   */
  const scaleFactors = useMemo(() => {
    if (imageDimensions.width === 0 || displayedDimensions.width === 0)
      return { scaleX: 1, scaleY: 1 };
    return {
      scaleX: imageDimensions.width / displayedDimensions.width,
      scaleY: imageDimensions.height / displayedDimensions.height,
    };
  }, [imageDimensions, displayedDimensions]);

  /**
   * Converts crop coordinates from displayed dimensions to original image dimensions
   * @param {Crop} displayedCrop - Crop coordinates in displayed (screen) dimensions
   * @returns {Crop} Crop coordinates scaled to original image dimensions
   */
  const convertToOriginalCoordinates = useCallback(
    (displayedCrop: Crop) => ({
      unit: "px" as const, // add unit
      x: Math.round(displayedCrop.x * scaleFactors.scaleX),
      y: Math.round(displayedCrop.y * scaleFactors.scaleY),
      width: Math.round(displayedCrop.width * scaleFactors.scaleX),
      height: Math.round(displayedCrop.height * scaleFactors.scaleY),
    }),
    [scaleFactors]
  );

  /**
   * Handles image load event and initializes crop area
   * Sets up image dimensions and creates initial centered crop area
   * @param {HTMLImageElement} img - The loaded image element
   */
  const onImageLoaded = useCallback(
    (img: HTMLImageElement) => {
      if (isImageLoaded) return;

      imgRef.current = img;
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      const displayedWidth = img.clientWidth;
      const displayedHeight = img.clientHeight;

      setImageDimensions({ width: naturalWidth, height: naturalHeight });
      setDisplayedDimensions({
        width: displayedWidth,
        height: displayedHeight,
      });
      setIsImageLoaded(true);

      const cropSizePercentage = 0.4;
      let cropWidth = Math.max(
        150,
        Math.round(displayedWidth * cropSizePercentage)
      );
      let cropHeight = Math.max(
        150,
        Math.round(displayedHeight * cropSizePercentage)
      );
      const displayedAspectRatio = displayedWidth / displayedHeight;
      if (cropWidth / cropHeight > displayedAspectRatio)
        cropWidth = Math.round(cropHeight * displayedAspectRatio);
      else cropHeight = Math.round(cropWidth / displayedAspectRatio);

      const centerX = Math.round((displayedWidth - cropWidth) / 2);
      const centerY = Math.round((displayedHeight - cropHeight) / 2);

      const newCrop: Crop = {
        unit: "px",
        x: centerX,
        y: centerY,
        width: cropWidth,
        height: cropHeight,
      };
      setInitialCrop(newCrop);
      setCrop(newCrop);
    },
    [isImageLoaded]
  );

  /**
   * Handles crop area changes from user interaction
   * Updates crop state with rounded pixel values
   * @param {Partial<Crop>} newCrop - Partial crop object with updated properties
   */
  const handleCropChange = useCallback((newCrop: Partial<Crop>) => {
    setCrop((prev) => ({
      ...prev,
      ...newCrop,
      x: Math.round(newCrop.x ?? prev.x),
      y: Math.round(newCrop.y ?? prev.y),
      width: Math.round(newCrop.width ?? prev.width),
      height: Math.round(newCrop.height ?? prev.height),
      unit: prev.unit,
    }));
  }, []);

  /**
   * Draws logo overlay on canvas preview
   * Creates a semi-transparent overlay with positioned and scaled logo
   */
  const drawLogoPreview = useCallback(() => {
    if (!canvasRef.current || !logoFile || !imgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const logoImg = new Image();
    logoImg.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const logoWidth = canvas.width * logoScale;
      const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
      let logoX = 0,
        logoY = 0;

      switch (logoPosition) {
        case "top-left":
          logoX = 10;
          logoY = 10;
          break;
        case "top-right":
          logoX = canvas.width - logoWidth - 10;
          logoY = 10;
          break;
        case "bottom-left":
          logoX = 10;
          logoY = canvas.height - logoHeight - 10;
          break;
        case "bottom-right":
          logoX = canvas.width - logoWidth - 10;
          logoY = canvas.height - logoHeight - 10;
          break;
      }

      ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
    };
    logoImg.src = URL.createObjectURL(logoFile);
  }, [logoFile, logoPosition, logoScale]);

  /**
   * Effect hook to update logo preview when logo settings change
   */
  useEffect(() => {
    if (logoEnabled && logoFile) drawLogoPreview();
  }, [logoEnabled, logoFile, logoPosition, logoScale, drawLogoPreview]);

  /**
   * Effect hook to update logo preview when crop changes
   */
  useEffect(() => {
    if (logoFile && logoEnabled) drawLogoPreview();
  }, [
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    logoFile,
    logoEnabled,
    drawLogoPreview,
  ]);

  /**
   * Handles logo enable/disable toggle
   * Resets logo settings and clears canvas when disabling logo
   * @param {boolean} enabled - Whether logo should be enabled
   */
  const handleLogoEnabledChange = useCallback((enabled: boolean) => {
    setLogoEnabled(enabled);
    if (!enabled) {
      setLogoFile(null);
      setLogoPosition("bottom-right");
      setLogoScale(0.1);
      setSavedConfigId(null);

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx)
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
      }
    }
  }, []);

  /**
   * Saves logo configuration to the server
   * Uploads logo image and position/scale settings
   * @throws {Error} When logo file is not selected or upload fails
   */
  const handleSaveLogo = async () => {
    if (!logoFile) {
      setSnackbar({
        open: true,
        message: "Please upload a logo first",
        severity: "error",
      });
      return;
    }
    const fd = new FormData();
    fd.append("logoImage", logoFile);
    fd.append("logoPosition", logoPosition);
    fd.append("scaleDown", String(logoScale));

    try {
      const response = await configureLogo(fd);
      setSavedConfigId(response.id);
      setSnackbar({
        open: true,
        message: "Logo configuration saved!",
        severity: "success",
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: `Failed to save logo: ${
          error.response?.data?.message || error.message
        }`,
        severity: "error",
      });
    }
  };

  /**
   * Generates a preview of the cropped image
   * Converts crop coordinates and sends to backend for processing
   * Switches to preview mode on success
   */
  const handlePreview = async () => {
    const originalCrop = convertToOriginalCoordinates(crop);
    const fd = new FormData();
    fd.append("image", file);
    fd.append("crop", JSON.stringify(originalCrop));

    setLoading(true);
    try {
      const blob = await previewImage(fd);
      setPreviewUrl(URL.createObjectURL(blob));
      setPreviewMode(true);
    } catch {
      setSnackbar({ open: true, message: "Preview failed", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generates and downloads the final cropped image
   * Includes logo if configured and saved
   * Triggers browser download of the processed image
   */
  const handleGenerate = async () => {
    const originalCrop = convertToOriginalCoordinates(crop);
    const fd = new FormData();
    fd.append("image", file);
    fd.append("crop", JSON.stringify(originalCrop));
    if (savedConfigId) fd.append("configId", savedConfigId);

    setLoading(true);
    try {
      const blob = await generateImage(fd);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const originalName = file.name.replace(/\.[^/.]+$/, "");
      a.href = url;
      a.download = `${originalName}_crop.png`;
      a.click();
      setSnackbar({
        open: true,
        message: "Image downloaded successfully!",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Download failed",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  /**
   * Returns from preview mode back to crop editing mode
   */
  const handleBackToCrop = () => setPreviewMode(false);

  return {
    refs: { imgRef, canvasRef },
    state: {
      crop,
      previewUrl,
      loading,
      previewMode,
      snackbar,
      logoEnabled,
      logoFile,
      logoPosition,
      logoScale,
      savedConfigId,
      imageDimensions,
      setLogoFile,
      setLogoPosition,
      setLogoScale,
    },
    handlers: {
      handleCropChange,
      onImageLoaded,
      handlePreview,
      handleGenerate,
      handleLogoEnabledChange,
      handleSaveLogo,
      handleBackToCrop,
      setSnackbar,
      convertToOriginalCoordinates,
    },
  };
}
