import sharp from "sharp";

export const gravityMap: Record<string, sharp.Gravity> = {
  "top-left": sharp.gravity.northwest,
  "top-right": sharp.gravity.northeast,
  "bottom-left": sharp.gravity.southwest,
  "bottom-right": sharp.gravity.southeast,
};
