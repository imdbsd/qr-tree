import {
  createWidget,
  widget,
  text_style,
  align,
  prop,
  getImageInfo,
} from "@zos/ui";
import { log, px } from "@zos/utils";
import { DEVICE_WIDTH } from "./utils";

class Image {
  src;
  configs;
  instance;

  /**
   * @param {string} src
   * @param {{
   * align: 'left' | 'center' | 'right'
   * widgetOptions: Record<string, any>
   * } | undefined} configs
   * @returns {[type: string, options: Record<string, unknown>]}
   */
  constructor(src, configs) {
    this.src = src;
    this.configs = configs;
    this.render();
  }

  setSrc = (src) => {
    if (!this.instance) return;
    this.src = src;

    this.instance.setProperty(prop.MORE, {
      src,
    });
  };

  /**
   * @param {string} src
   * @param {{
   * align: 'left' | 'center' | 'right'
   * widgetOptions: Record<string, any>
   * } | undefined} configs
   * @returns {[type: string, options: Record<string, unknown>]}
   */
  static compose = (src, configs) => {
    return [
      widget.IMG,
      {
        src,
        x: Image.getImageAlign(src, configs?.align),
        ...configs?.widgetOptions,
      },
    ];
  };

  /**
   * @param {'left' | 'center' | 'right' | undefined} align
   */
  static getImageAlign = (src, align) => {
    log.debug("awas", {
      src,
      align,
    });
    const { width, height } = getImageInfo(src);
    switch (align) {
      case "center": {
        return DEVICE_WIDTH / 2 - width / 2;
      }
      case "right":
        return DEVICE_WIDTH - width;
      case "left":
      default:
        return 0;
    }
  };

  render() {
    if (!this.src) return;

    this.instance = createWidget(...Image.compose(this.src, this.configs));
  }
}

export default Image;
