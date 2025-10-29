export interface CreateConfigurationData {
  scaleDown: number;
  logoPosition: string;
  logoImage: string;
}

export interface UpdateConfigurationData {
  id: string;
  scaleDown?: number;
  logoPosition?: string;
  logoImage?: string;
}
