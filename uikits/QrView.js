import { createWidget, widget, deleteWidget } from "@zos/ui";
import { getDeviceInfo } from "@zos/device";
import { getDeviceRadius } from "../helpers/getDeviceRadius";

const device = getDeviceInfo();

class QrView {
  instance = null;
  backgroundView = null;
  content = "";
  configs;

  /**
   * @param {string} content;
   * @param {{
   *    backgroundColor?: number
   *    x?: number,
   *    y?: number,
   *    size?: number,
   *    padding?: number,
   *    widgetOptions?: Record<string, any>
   * }} configs
   */
  constructor(content, configs) {
    this.content = content;
    this.configs = configs;

    this.render();
  }

  /**
   * @param {string} content;
   * @param {{
   *    backgroundColor?: number
   *    x?: number,
   *    y?: number,
   *    size?: number,
   *    padding?: number,
   *    widgetOptions?: Record<string, any>
   * }} configs
   * @returns {[type: string, options: Record<string, unknown>]}
   */
  static compose = (content, configs) => {
    const xPos = configs?.x || 0;
    const yPos = configs?.y || 0;

    const size = configs?.size || 200;
    const padding = configs?.padding || 20;

    return [
      [
        widget.FILL_RECT,
        {
          x: xPos,
          y: yPos,
          w: device.width,
          h: device.height,
          radius: getDeviceRadius(),
          color: configs?.backgroundColor,
          ...configs?.widgetOptions,
        },
      ],
      [
        widget.QRCODE,
        {
          content,
          x: xPos + device.width / 2 - size / 2,
          y: yPos + device.height / 2 - size / 2,
          w: size,
          h: size,
          bg_x: xPos + device.width / 2 - size / 2 - padding / 2,
          bg_y: yPos + device.height / 2 - size / 2 - padding / 2,
          bg_w: size + padding,
          bg_h: size + padding,
        },
      ],
    ];
  };

  destroy() {
    deleteWidget(this.backgroundView);
    deleteWidget(this.instance);
  }

  render() {
    const [background, qr] = QrView.compose(this.content, this.configs);
    this.backgroundView = createWidget(...background);
    this.instance = createWidget(...qr);
  }
}

export default QrView;
