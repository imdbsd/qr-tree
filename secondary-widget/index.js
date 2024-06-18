import {
  createWidget,
  widget,
  align,
  text_style,
  getImageInfo,
  event,
} from "@zos/ui";
import QrView from "../uikits/QrView";
import AppStorage from "../helpers/storage/appStorage";
import hexToNumberColor from "../helpers/hexToNumberColor";
import { Text } from "../uikits";
import { getDeviceInfo } from "@zos/device";
import { push, replace } from "@zos/router";

const device = getDeviceInfo();

SecondaryWidget({
  state: {
    pinned: null,
    index: -1,
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
      const [pinned, index] = this.state.appStorage.getPinned();
      if (pinned && this.state.pinned !== pinned) {
        this.state.pinned = pinned;
        this.state.index = index;
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
      this.ui.qrUi.instance.addEventListener(event.CLICK_DOWN, () => {
        console.log("CLICKED QR");
        this.navigateToApp();
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

  navigateToApp() {
    if (this.state.index > -1) {
      push({
        url: "page/detail-page",
        params: {
          index: this.state.index,
        },
      });
    }
  },

  initAppStorage() {
    const storage = new AppStorage();
    this.state.appStorage = storage;
  },
});
