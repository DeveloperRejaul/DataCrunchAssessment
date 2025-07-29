export function rcp(hex: string, opacityPercent: number) {
  return hex + Math.round(opacityPercent * 255).toString(16);
}
