import {
  Box,
  Typography,
  Divider,
  Paper,
  Switch,
  FormControlLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import CropInputs from "./CropInputs";
import LogoSettings from "./LogoSettings";
import { type Crop, type LogoPosition } from "../../types/types";

interface SettingsPanelProps {
  crop: Crop;
  onCropChange: (c: Partial<Crop>) => void;
  logoEnabled: boolean;
  setLogoEnabled: (v: boolean) => void;
  logoFile: File | null;
  setLogoFile: (f: File | null) => void;
  logoPosition: LogoPosition;
  setLogoPosition: (p: LogoPosition) => void;
  logoScale: number;
  setLogoScale: (s: number) => void;
  onSaveLogo: () => void;
  onGenerate: () => void;
  loading: boolean;
  savedConfigId: string | null;
}

const SettingsPanel = ({
  crop,
  onCropChange,
  logoEnabled,
  setLogoEnabled,
  logoFile,
  setLogoFile,
  logoPosition,
  setLogoPosition,
  logoScale,
  setLogoScale,
  onSaveLogo,
  onGenerate,
  loading,
  savedConfigId,
}: SettingsPanelProps) => {
  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        borderRadius: 0,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Crop Settings */}
      <Box>
        <Typography fontWeight={700} variant="h6" gutterBottom>
          Crop Settings
        </Typography>
        <CropInputs crop={crop} onChange={onCropChange} />
      </Box>

      <Divider />

      {/* Logo Settings */}
      <Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography fontWeight={600} variant="h6">
            Logo Settings
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={logoEnabled}
                onChange={(e) => setLogoEnabled(e.target.checked)}
              />
            }
            label=""
          />
        </Box>

        <LogoSettings
          logoEnabled={logoEnabled}
          setLogoEnabled={setLogoEnabled}
          logoFile={logoFile}
          setLogoFile={setLogoFile}
          logoPosition={logoPosition}
          setLogoPosition={setLogoPosition}
          logoScale={logoScale}
          setLogoScale={setLogoScale}
          onSaveLogo={onSaveLogo}
          savedConfigId={savedConfigId}
        />
      </Box>

      {/* Generate Button at bottom */}
      <Box sx={{ mt: "auto" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onGenerate}
          disabled={loading}
          fullWidth
          size="large"
        >
          {loading ? <CircularProgress size={24} /> : "Generate & Download"}
        </Button>
      </Box>
    </Paper>
  );
};

export default SettingsPanel;
