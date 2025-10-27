import asyncHandler from "express-async-handler";
import { AppError } from "../utils/AppError";
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
  async (req: ConfigurationRequest, res, next) => {
    const { scaleDown, logoPosition } = req.body;
    const logoImage = req.file!.path;

    const newConfig = await createConfiguration({
      scaleDown,
      logoPosition,
      logoImage,
    });

    res.status(201).json(newConfig);
  }
);

export const updateConfig = asyncHandler(
  async (req: UpdateConfigurationRequest, res, next) => {
    const { id } = req.params;
    const { scaleDown, logoPosition } = req.body;

    // Check if configuration exists
    const updateData: UpdateConfigurationData = { id };

    if (scaleDown !== undefined) {
      updateData.scaleDown = scaleDown;
    }

    if (logoPosition !== undefined) {
      updateData.logoPosition = logoPosition;
    }

    if (req.file) {
      updateData.logoImage = req.file.path;
    }

    const updatedConfig = await updateConfiguration(updateData);
    res.status(200).json(updatedConfig);
  }
);
