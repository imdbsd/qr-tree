import { createWidget, widget, align, text_style, getImageInfo } from "@zos/ui";
import QrView from "../uikits/QrView";
import AppStorage from "../helpers/storage/appStorage";
import hexToNumberColor from "../helpers/hexToNumberColor";
import { Text } from "../uikits";
import { getDeviceInfo } from "@zos/device";

const device = getDeviceInfo();

SecondaryWidget({
  state: {
    pinned: null,
    appStorage: null,
  },
  ui: {
    qrUi: null,
    qrTitle: null,
    noPinned: null,
    qrIcon: null,
  },
  onInit() {
    this.initAppStorage();
    this.syncPinnedLink();
  },
  build() {
    this.drawPinned();
  },
  onResume() {
    const isUpdate = this.syncPinnedLink();
    if (isUpdate) {
      this.drawPinned();
    }
  },
  onPause() {},
  onDestroy() {},

  syncPinnedLink() {
    if (this.state.appStorage) {
      const pinned = this.state.appStorage.getPinned();
      if (pinned && this.state.pinned !== pinned) {
        this.state.pinned = pinned;
        return true;
      }
    }
    return false;
  },

  /**
   * TODO: Handle update pinned mechanism that come from app settings
   */
  drawPinned() {
    const { pinned } = this.state;
    if (pinned) {
      this.ui.qrUi = new QrView(pinned.url, {
        backgroundColor: hexToNumberColor(pinned.backgroundColor),
      });
      this.ui.qrTitle = new Text(pinned.label, {
        size: "Title",
        textAlign: "center",
        textStyle: "ellipsis",
        color: hexToNumberColor("#ffffff"),
        widgetOptions: {
          y: 30,
        },
      });
    } else {
      this.ui.noPinned = new Text("No Pinned QR", {
        textAlign: "center",
        color: hexToNumberColor("#ffffff"),
        widgetOptions: {
          y: device.height / 2,
        },
      });
      const imageInfo = getImageInfo("icons/ic_qrcode.png");
      this.ui.qrIcon = createWidget(widget.IMG, {
        x: device.width / 2 - imageInfo.width / 2,
        y:
          device.height / 2 - imageInfo.height / 2 - Text.getTextSize("Body").h,
        src: "icons/ic_qrcode.png",
      });
    }
  },

  initAppStorage() {
    const storage = new AppStorage();
    this.state.appStorage = storage;
  },
});
