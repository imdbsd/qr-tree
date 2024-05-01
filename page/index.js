import { getText } from "@zos/i18n";
import { log } from "@zos/utils";
import { buf2json } from "../helpers/message-builder/data";
import { MessageBuilder } from "../helpers/message-builder/message";
import { Text } from "../uikits";
// import {
//   createConnect,
//   send,
//   disConnect,
//   connectStatus,
//   addListener,
// } from "@zos/ble";
import * as ble from "@zos/ble";
import { getPackageInfo } from "@zos/app";

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

    const textUi = new Text("Heelo Gaes");

    // logger.log("build messageBUilder: ", this.state.messageBuilder);

    this.state.messageBuilder.on("call", ({ payload: buf }) => {
      log.debug("message builder payload: ", payload);
      const data = buf2json(buf);

      log.debug("message builder: ", data);

      textUi.setText(data);
      // const dataList = data.map((i) => ({ name: i }));
      // logger.log("call dataList", dataList);
      // this.refreshAndUpdate(dataList);
    });

    // // Create Connection
    // createConnect(function (index, data, size) {
    //   log.debug("index,", index);
    //   log.debug("data,", data);
    //   log.debug("size,", size);
    //   // Receive message callback, return the received message as it is
    //   send(data, size);
    // });

    // // // Disconnection
    // // disConnect();

    // // Print Bluetooth connection status
    // log.debug("connectStatus ", connectStatus());

    // // Register to listen for connection status
    // addListener(function (status) {
    //   // Print connection status
    //   log.debug("connection status ", connectStatus());
    // });
  },

  onDestroy() {
    logger.log("app onDestroy invoked");
    this.state.messageBuilder && this.state.messageBuilder.disConnect();
  },
});
