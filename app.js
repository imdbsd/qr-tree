import "./helpers/message-builder/device-polyfill";
import { getPackageInfo } from "@zos/app";
import * as ble from "@zos/ble";
import { MessageBuilder } from "./helpers/message-builder/message";
import { logger } from "./helpers/logger";
import AppStorage from "./helpers/storage/appStorage";
import { REQUEST_EVENT_TYPE } from "./helpers/messaging/constants";

App({
  globalData: {},
  onCreate(options) {
    logger.log("app on create invoke");

    this.initMessageBuilder();
    this.initAppStorage();

    this.syncData();
  },

  initMessageBuilder() {
    const { appId } = getPackageInfo();

    const messageBuilder = new MessageBuilder({
      appId,
      appDevicePort: 20,
      appSidePort: 0,
      ble,
    });

    this.globalData.messageBuilder = messageBuilder;
    messageBuilder.connect();
  },

  initAppStorage() {
    const storage = new AppStorage();

    this.globalData.appStorage = storage;
  },

  syncData() {
    this.globalData.messageBuilder
      .request({
        method: REQUEST_EVENT_TYPE.SYNC_LINKS,
      })
      .then((value) => {
        logger.log("value: ", value);
        this.globalData.appStorage.setLinks(value);
      });
  },
  onDestroy(options) {
    logger.log("app on destroy invoke");
    this.globalData.messageBuilder &&
      this.globalData.messageBuilder.disConnect();
  },
});
