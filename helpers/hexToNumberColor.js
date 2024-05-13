const hexToNumberColor = (color) => {
  const parsed = Number(color.replace("#", "0x"));
  return Number.isNaN(parsed) ? 0 : parsed;
};

export default hexToNumberColor;
