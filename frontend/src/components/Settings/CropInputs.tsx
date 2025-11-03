import { Box, TextField } from "@mui/material";
import { type Crop } from "../../types/types";

interface CropInputsProps {
  crop: Crop;
  onChange: (c: Partial<Crop>) => void;
}

const CropInputs = ({ crop, onChange }: CropInputsProps) => {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
      <TextField
        label="Width"
        size="small"
        type="number"
        value={Math.round(crop.width) ?? ""}
        onChange={(e) =>
          onChange({ width: Math.round(Number(e.target.value || 0)) })
        }
      />
      <TextField
        label="Height"
        size="small"
        type="number"
        value={Math.round(crop.height) ?? ""}
        onChange={(e) =>
          onChange({ height: Math.round(Number(e.target.value || 0)) })
        }
      />
      <TextField
        label="X Position"
        size="small"
        type="number"
        value={Math.round(crop.x) ?? ""}
        onChange={(e) =>
          onChange({ x: Math.round(Number(e.target.value || 0)) })
        }
      />
      <TextField
        label="Y Position"
        size="small"
        type="number"
        value={Math.round(crop.y) ?? ""}
        onChange={(e) =>
          onChange({ y: Math.round(Number(e.target.value || 0)) })
        }
      />
    </Box>
  );
};

export default CropInputs;
