import { createWidget, widget, setStatusBarVisible } from "@zos/ui";
import { getDeviceInfo } from "@zos/device";
import { getText } from "@zos/i18n";
import { log } from "@zos/utils";
import { MessageBuilder } from "../helpers/message-builder/message";
import { Text } from "../uikits";
import {
  CALL_EVENT_TYPE,
  REQUEST_EVENT_TYPE,
} from "../helpers/messaging/constants";
import { logger } from "../helpers/logger";
import QrView from "../uikits/QrView";

const { messageBuilder, appStorage } = getApp()._options.globalData;

Page({
  state: { subtitleUi: null, links: [] },
  ui: { subtitleUi: null },
  subtitleUi: null,

  onInit() {
    this.state.links = appStorage.getLinks();
    this.listenHandler();
    setStatusBarVisible(false);
  },

  build() {
    new QrView("Hello Gaes", {
      backgroundColor: 0xb5c0d0,
    });

    new QrView("David Disini", {
      backgroundColor: 0xfcffe0,
      y: 450,
    });

    // new Text("QR TREE", { widgetOptions: { y: 450 } });
    // if (Array.isArray(this.state.links) && this.state.links.length) {
    //   this.state.links.forEach((link, index) => {
    //     new Text(link.link, { widgetOptions: { y: 100 + index * 50 } });
    //   });
    // }
  },

  listenHandler() {
    messageBuilder.on("call", ({ payload: buf }) => {
      // call the messageBuilder.buf2Json method to convert the buffer to a JS JSON object
      const event = messageBuilder.buf2Json(buf);
      // logger.log("event: ", event);
      const { method, params } = event;
      console.log({ method, params });
      // switch (method) {
      //   case "UPDATE_TEXT": {
      //     // subtitleUi.setText(params.text);
      //     this.ui.subtitleUi.setText(params.text);
      //   }
      // }
      // logger.log("event masuk as", event);
    });
  },

  onDestroy() {},
});
