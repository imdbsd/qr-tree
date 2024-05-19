import { createWidget, widget, text_style, align, prop } from "@zos/ui";
import { log, px } from "@zos/utils";
import { DEVICE_WIDTH } from "./utils";
import hexToNumberColor from "../helpers/hexToNumberColor";

class Text {
  instance = null;
  text = "";
  configs;

  /**
   * @param {string | undefined} text
   * @param {{
   *  textAlign: 'left' | 'center' | 'right'
   *  color?: number | string
   *  widgetOptions: Record<string, any>
   *  size?: 'Caption1'|'Subheadline'|'Body'|'Title'|'Title1' | 'LargeTitle'
   *  textStyle?: 'wrap' | 'char_wrap' | 'ellipsis'
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
   *  color?: number | string
   *  widgetOptions: Record<string, any>
   *  size?: 'Caption1'|'Subheadline'|'Body'|'Title'|'Title1' | 'LargeTitle'
   *  textStyle?: 'wrap' | 'char_wrap' | 'ellipsis'
   * } | undefined} configs
   * @param {options: HmWearableProgram.DeviceSide.HmUI.HmUIWidgetOptions | undefined} widgetOptions
   * @returns {[type: string, options: Record<string, unknown>]}
   */
  static compose = (text, configs) => {
    return [
      widget.TEXT,
      {
        x: 0,
        y: 0,
        w: DEVICE_WIDTH,
        color:
          typeof configs?.color === "string" && configs?.color
            ? hexToNumberColor(configs.color)
            : configs?.color || 0xffffff,
        ...Text.getTextSize(configs?.size || "Body"),
        align_h: Text.getTextAlign(configs?.textAlign),
        align_v: align.TOP,
        text,
        text_style: Text.getTextStlye(configs?.textStyle),
        ...configs?.widgetOptions,
      },
    ];
  };

  /**
   *
   * @param {string} key
   * @param {{
   *  textAlign: 'left' | 'center' | 'right'
   *  color?: number | string
   *  widgetOptions: Record<string, any>
   *  size?: 'Caption1'|'Subheadline'|'Body'|'Title'|'Title1' | 'LargeTitle'
   *  textStyle?: 'wrap' | 'char_wrap' | 'ellipsis'
   * } | undefined} configs
   * @param {options: HmWearableProgram.DeviceSide.HmUI.HmUIWidgetOptions | undefined} widgetOptions
   * @returns {[type: string, options: Record<string, unknown>]}
   */
  static composeList = (key, configs) => {
    const [, composed] = Text.compose("", configs);
    return { ...composed, key };
  };

  /**
   *
   * @param {'wrap' | 'char_wrap' | 'ellipsis' | undefined} style
   */
  static getTextStlye = (style) => {
    switch (style) {
      case "char_wrap":
        return text_style.CHAR_WRAP;
      case "wrap":
        return text_style.WRAP;
      case "ellipsis":
        return text_style.ELLIPSIS;
      default:
        return text_style.NONE;
    }
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
   *
   * @param {'Caption1'|'Subheadline'|'Body'|'Title'|'Title1' | 'LargeTitle'} variant
   * @returns
   */
  static getTextSize = (variant) => {
    switch (variant) {
      case "Caption1": {
        return { text_size: px(24), h: px(24 + 20) };
      }
      case "Subheadline": {
        return { text_size: px(28), h: px(28 + 20) };
      }
      case "Body": {
        return { text_size: px(32), h: px(32 + 20) };
      }
      case "Title": {
        return { text_size: px(36), h: px(36 + 20) };
      }
      case "Title1": {
        return { text_size: px(40), h: px(40 + 20) };
      }
      case "LargeTitle": {
        return { text_size: px(48), h: px(48 + 20) };
      }
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
