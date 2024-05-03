import { getText } from "@zos/i18n";
import { log } from "@zos/utils";
import { buf2json } from "../helpers/message-builder/data";
import { MessageBuilder } from "../helpers/message-builder/message";
import { Text } from "../uikits";
import * as ble from "@zos/ble";
import { getPackageInfo } from "@zos/app";
import { CALL_EVENT } from "../helpers/messaging/constants";

const logger = log.getLogger("qr-tree");

Page({
  state: {
    messageBuilder: null,
  },

  onInit() {
    logger.log("app onCreate invoked");
    const { appId } = getPackageInfo();
    logger.log("appId: ", appId);
    const messageBuilder = new MessageBuilder({
      appId,
      appDevicePort: 20,
      appSidePort: 0,
      ble,
    });

    logger.log("messageBuilder: ", messageBuilder);

    this.state.messageBuilder = messageBuilder;
    messageBuilder.connect();

    logger.log("onCreate messageBUilder: ", this.state.messageBuilder);
  },

  build() {
    // console.log(getText("example"));

    const textUi = new Text("Heelo Ga es");

    // logger.log("build messageBUilder: ", this.state.messageBuilder);

    this.state.messageBuilder.on("call", ({ payload: buf }) => {
      log.debug("message builder payload: ", buf);
      const { type, data } = buf2json(buf);

      log.debug("message builder callEvent: ", callEvent);

      switch (type) {
        case CALL_EVENT.TEST_VALUE_CHANGE: {
          textUi.setText(data);
          break;
        }
      }
    });
  },

  onDestroy() {
    logger.log("app onDestroy invoked");
    this.state.messageBuilder && this.state.messageBuilder.disConnect();
  },
});
