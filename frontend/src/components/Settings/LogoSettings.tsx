import React from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import { type LogoPosition } from "../../types/types";

interface LogoSettingsProps {
  logoEnabled: boolean;
  setLogoEnabled: (v: boolean) => void;
  logoFile: File | null;
  setLogoFile: (f: File | null) => void;
  logoPosition: LogoPosition;
  setLogoPosition: (p: LogoPosition) => void;
  logoScale: number;
  setLogoScale: (s: number) => void;
  onSaveLogo: () => void;
  savedConfigId: string | null;
}

const LogoSettings = ({
  logoEnabled,
  setLogoEnabled,
  logoFile,
  setLogoFile,
  logoPosition,
  setLogoPosition,
  logoScale,
  setLogoScale,
  onSaveLogo,
  savedConfigId,
}: LogoSettingsProps) => {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setLogoFile(f);
  };

  if (!logoEnabled) return null;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Button variant="outlined" component="label" size="small" fullWidth>
        Upload Logo
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={handleFileSelect}
        />
      </Button>

      <FormControl size="small" fullWidth>
        <InputLabel id="logo-pos-label">Logo Position</InputLabel>
        <Select
          label="Logo Position"
          labelId="logo-pos-label"
          value={logoPosition}
          onChange={(e) => setLogoPosition(e.target.value as LogoPosition)}
        >
          <MenuItem value="top-left">Top Left</MenuItem>
          <MenuItem value="top-right">Top Right</MenuItem>
          <MenuItem value="bottom-left">Bottom Left</MenuItem>
          <MenuItem value="bottom-right">Bottom Right</MenuItem>
        </Select>
      </FormControl>

      <Box>
        <Typography variant="body2" gutterBottom>
          Logo Scale: {logoScale.toFixed(2)}
        </Typography>
        <Slider
          value={logoScale}
          min={0}
          max={0.25}
          step={0.01}
          onChange={(_, v) => setLogoScale(Number(v))}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => value.toFixed(2)}
        />
      </Box>

      <Button variant="contained" onClick={onSaveLogo} disabled={!logoFile}>
        Save Logo Configuration
      </Button>

      <Typography variant="body2" color="text.secondary" textAlign="center">
        {logoFile ? `Selected: ${logoFile.name}` : "No logo selected"}
      </Typography>
    </Box>
  );
};

export default LogoSettings;
