import { getText } from "@zos/i18n";
import { log } from "@zos/utils";
import { MessageBuilder } from "../helpers/message-builder/message";
import { Text } from "../uikits";
import { CALL_EVENT } from "../helpers/messaging/constants";

const { messageBuilder } = getApp()._options.globalData;

const logger = log.getLogger("qr-tree");

Page({
  state: {},

  onInit() {},

  build() {
    const textUi = new Text("QR TREE");
    const subtitleUi = new Text("QR TREE", { widgetOptions: { y: 100 } });
    const dataUi = new Text("QR TREE", { widgetOptions: { y: 150 } });
    messageBuilder
      .request({
        method: "INITIAL_DATA",
      })
      .then((value) => {
        logger.log("value: ", value);
        logger.log("value: ", value.text);
        dataUi.setText(value.text);
      });

    messageBuilder.on("call", ({ payload: buf }) => {
      // call the messageBuilder.buf2Json method to convert the buffer to a JS JSON object
      const event = messageBuilder.buf2Json(buf);
      const { method, params } = event;
      switch (method) {
        case "UPDATE_TEXT": {
          subtitleUi.setText(params.text);
        }
      }
      logger.log("event masuk as", event);
    });
  },

  onDestroy() {},
});
