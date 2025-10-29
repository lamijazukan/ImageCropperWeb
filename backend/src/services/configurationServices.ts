import { prisma } from "../prisma-client";
import {
  CreateConfigurationData,
  UpdateConfigurationData,
} from "../types/config-data";

export const createConfiguration = async (data: CreateConfigurationData) => {
  const configuration = await prisma.configuration.create({
    data: {
      scaleDown: data.scaleDown,
      logoPosition: data.logoPosition,
      logoImage: data.logoImage,
    },
  });
  return configuration;
};

export const updateConfiguration = async (data: UpdateConfigurationData) => {
  const existingConfig = await prisma.configuration.findUnique({
    where: { id: data.id },
  });

  if (!existingConfig) {
    throw new Error("Configuration not found");
  }

  const updatedConfig = await prisma.configuration.update({
    where: { id: data.id },
    data: {
      scaleDown: data.scaleDown ?? existingConfig.scaleDown,
      logoPosition: data.logoPosition ?? existingConfig.logoPosition,
      logoImage: data.logoImage ?? existingConfig.logoImage,
    },
  });
  return updatedConfig;
};
