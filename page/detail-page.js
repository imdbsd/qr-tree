import {
  createWidget,
  widget,
  setStatusBarVisible,
  align,
  prop,
} from "@zos/ui";
import { getDeviceInfo } from "@zos/device";
import { getText } from "@zos/i18n";
import { log, px } from "@zos/utils";
import { MessageBuilder } from "../helpers/message-builder/message";
import { Text } from "../uikits";
import {
  CALL_EVENT_TYPE,
  REQUEST_EVENT_TYPE,
} from "../helpers/messaging/constants";
import { logger } from "../helpers/logger";
import QrView from "../uikits/QrView";
import {
  SCROLL_MODE_FREE,
  SCROLL_MODE_SWIPER_HORIZONTAL,
  setScrollMode,
} from "@zos/page";
import safeParseJSON from "../helpers/safeParseJSON";
import hexToNumberColor from "../helpers/hexToNumberColor";

const device = getDeviceInfo();
const { messageBuilder, appStorage } = getApp()._options.globalData;

Page({
  state: { link: null },
  ui: { subtitleUi: null },

  onInit(params) {
    const parsedParams = safeParseJSON(params);
    const index = parsedParams?.index;

    this.state.link =
      typeof index === "number" ? appStorage.getLinkAt(index) : null;
    this.listenHandler();

    setStatusBarVisible(false);
    setScrollMode({
      mode: SCROLL_MODE_FREE,
    });
  },

  build() {
    this.renderQR();
    this.renderDetail();
  },

  renderDetail() {
    const paddingTop = 10;
    const paddingLeft = 10;
    const { link } = this.state;
    if (link) {
      const group1 = createWidget(widget.GROUP, {
        y: device.height + paddingTop,
        x: paddingLeft,
      });

      group1.createWidget(
        ...Text.compose("Label", {
          size: "Title",
          widgetOptions: {
            y: 0,
            x: 0,
          },
        })
      );
      group1.createWidget(
        ...Text.compose(link.label, {
          size: "Caption1",
          textStyle: "wrap",
          color: hexToNumberColor("#D6DAC8"),
          widgetOptions: {
            y: Text.getTextSize("Title").h,
          },
        })
      );

      const backgroundColorGroup = createWidget(widget.GROUP, {
        y:
          device.height +
          paddingTop +
          (Text.getTextSize("Title").h + Text.getTextSize("Caption1").h),
        x: paddingLeft,
      });

      backgroundColorGroup.createWidget(
        ...Text.compose("Background Color", {
          size: "Title",
          widgetOptions: {
            y: 0,
            x: 0,
          },
        })
      );
      backgroundColorGroup.createWidget(
        ...Text.compose(link.backgroundColor, {
          size: "Caption1",
          color: hexToNumberColor("#D6DAC8"),
          widgetOptions: {
            y: Text.getTextSize("Title").h,
          },
        })
      );

      const contentGroup = createWidget(widget.GROUP, {
        y:
          device.height +
          paddingTop +
          (Text.getTextSize("Title").h + Text.getTextSize("Caption1").h) * 2,
        x: paddingLeft,
      });

      contentGroup.createWidget(
        ...Text.compose("Content", {
          size: "Title",
          widgetOptions: {
            y: 0,
            x: 0,
          },
        })
      );
      contentGroup.createWidget(
        ...Text.compose(link.url, {
          size: "Caption1",
          color: hexToNumberColor("#D6DAC8"),
          textStyle: "wrap",
          widgetOptions: {
            y: Text.getTextSize("Title").h,
          },
        })
      );
    }
  },

  renderQR() {
    const { link } = this.state;
    if (link) {
      this.ui.qrUi = new QrView(link.url, {
        backgroundColor: hexToNumberColor(link.backgroundColor),
      });
    } else {
      new Text("Preview Failed", {
        textAlign: "center",
        widgetOptions: {
          w: device.width,
          h: device.height,
          align_v: align.CENTER_V,
        },
      });
    }
  },

  listenHandler() {
    messageBuilder.on("call", ({ payload: buf }) => {
      // call the messageBuilder.buf2Json method to convert the buffer to a JS JSON object
      const event = messageBuilder.buf2Json(buf);
      logger.log("event: ", event);
      const { method, params } = event;
      // switch (method) {
      //   case "UPDATE_TEXT": {
      //     // subtitleUi.setText(params.text);
      //     this.ui.subtitleUi.setText(params.text);
      //   }
      // }
      logger.log("event masuk as", event);
    });
  },

  onDestroy() {},
});
