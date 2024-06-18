import { getDeviceInfo } from "@zos/device";

const device = getDeviceInfo();

/**
 * @param {number | undefined} source
 * @returns number
 */
export const getDeviceRadius = (source) => {
  const deviceSource = source || device.deviceSource;

  switch (deviceSource) {
    // Amazfit Active
    case 8323328:
    case 8323329: {
      return 86;
    }
    default:
      return 0;
  }
};
