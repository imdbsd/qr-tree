import { createWidget, widget, setStatusBarVisible, align } from "@zos/ui";
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
import { SCROLL_MODE_SWIPER_HORIZONTAL, setScrollMode } from "@zos/page";
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
      mode: SCROLL_MODE_SWIPER,
      options: {
        height: device.width,
        count: 2,
      },
    });
  },

  build() {
    const { link } = this.state;
    if (link) {
      this.ui.qrUi = new QrView(link.url, {
        backgroundColor: hexToNumberColor(link.backgroundColor),
      });
    } else {
      new Text("Preview Failed");
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
