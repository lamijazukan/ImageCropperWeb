import asyncHandler from "express-async-handler";
import {
  ConfigurationRequest,
  UpdateConfigurationRequest,
} from "../types/requests";
import {
  createConfiguration,
  updateConfiguration,
} from "../services/configurationServices";
import { UpdateConfigurationData } from "../types/config-data";

export const createConfig = asyncHandler(
  async (req: ConfigurationRequest, res) => {
    const { scaleDown, logoPosition } = req.body;

    const newConfig = await createConfiguration({
      scaleDown,
      logoPosition,
      logoImage: req.file!.path,
    });

    res.status(201).json(newConfig);
  }
);

export const updateConfig = asyncHandler(
  async (req: UpdateConfigurationRequest, res) => {
    const { id } = req.params;
    const { scaleDown, logoPosition } = req.body;

    // Check if configuration exists
    const updateData: UpdateConfigurationData = {
      id,
      ...(scaleDown !== undefined && { scaleDown }),
      ...(logoPosition !== undefined && { logoPosition }),
      ...(req.file && { logoImage: req.file.path }),
    };

    const updatedConfig = await updateConfiguration(updateData);
    res.json(updatedConfig);
  }
);
