import { createWidget, widget, text_style, align, prop } from "@zos/ui";
import { log } from "@zos/utils";
import { DEVICE_WIDTH } from "./utils";

class Text {
  instance = null;
  text = "";
  configs;

  /**
   * @param {string | undefined} text
   * @param {{
   *  textAlign: 'left' | 'center' | 'right'
   *  color: number
   *  widgetOptions: Record<string, any>
   * } | undefined} configs
   */
  constructor(text, configs) {
    this.text = text;
    this.configs = configs;
    this.render();
  }

  /**
   *
   * @param {string | undefined} text
   * @param {{
   *  textAlign: 'left' | 'center' | 'right'
   *  color: number
   *  widgetOptions: Record<string, any>
   * } | undefined} configs
   * @param {options: HmWearableProgram.DeviceSide.HmUI.HmUIWidgetOptions | undefined} widgetOptions
   * @returns {[type: string, options: Record<string, unknown>]}
   */
  static compose = (text, configs) => {
    return [
      widget.TEXT,
      {
        x: 0,
        y: 50,
        w: DEVICE_WIDTH,
        h: 46,
        color: 0xffffff,
        text_size: 36,
        align_h: Text.getTextAlign(configs?.textAlign),
        align_v: align.TOP,
        text,
        ...configs?.widgetOptions,
      },
    ];
  };

  /**
   * @param {'left' | 'center' | 'right' | undefined} textAlign
   */
  static getTextAlign = (textAlign) => {
    switch (textAlign) {
      case "center":
        return align.CENTER_H;
      case "right":
        return align.RIGHT;
      case "left":
      default:
        return align.LEFT;
    }
  };

  /**
   * @param {string} text
   */
  setText = (text) => {
    if (!this.instance) return;

    this.text = text;
    this.instance.setProperty(prop.MORE, { text });
  };

  render() {
    this.instance = createWidget(...Text.compose(this.text, this.configs));
  }
}

export default Text;
