import "./helpers/message-builder/device-polyfill";
import { getPackageInfo } from "@zos/app";
import * as ble from "@zos/ble";
import { MessageBuilder } from "./helpers/message-builder/message";
import { log } from "@zos/utils";

App({
  globalData: {},
  onCreate(options) {
    console.log("app on create invoke");

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

  onDestroy(options) {
    console.log("app on destroy invoke");
    this.globalData.messageBuilder &&
      this.globalData.messageBuilder.disConnect();
  },
});
