import {
  createWidget,
  event,
  prop,
  text_style,
  widget,
  getImageInfo,
  align,
  setStatusBarVisible,
} from "@zos/ui";
import { push } from "@zos/router";
import Text from "../uikits/Text";
import { getDeviceInfo } from "@zos/device";
import { logger } from "../helpers/logger";
import hexToNumberColor from "../helpers/hexToNumberColor";
import { CALL_EVENT_TYPE } from "../helpers/messaging/constants";

const device = getDeviceInfo();
const { messageBuilder, appStorage } = getApp()._options.globalData;

Page({
  state: {
    links: [],
  },
  onInit() {
    this.state.links = appStorage.getLinks().map((links) => {
      return { ...links, list_icon: "icons/ic_retreat-small.png" };
    });

    messageBuilder.on("call", ({ payload: buf }) => {
      // call the messageBuilder.buf2Json method to convert the buffer to a JS JSON object
      const event = messageBuilder.buf2Json(buf);
      logger.log("event: ", event);
      const { method, params } = event;
      // console.log({ method, params });
      switch (method) {
        case CALL_EVENT_TYPE.CONTENT_CHANGE: {
          appStorage.setLinks(params.contents);
        }
      }
      logger.log("event masuk as", event);
    });
  },
  build() {
    const scrollList = createWidget(widget.SCROLL_LIST, {
      x: 0,
      y: 50,
      h: device.height - 50,
      w: device.width,
      item_space: 20,
      item_config: [
        {
          text_view: [
            {
              action: true,
              ...Text.composeList("label", {
                size: "Title",
                color: hexToNumberColor("#ffffff"),
                textStyle: "ellipsis",
                widgetOptions: {
                  x: 30,
                  w:
                    device.width -
                    getImageInfo("icons/ic_retreat-small.png").width -
                    100,
                },
              }),
            },
            {
              action: true,
              ...Text.composeList("content", {
                size: "Caption1",
                color: hexToNumberColor("#D2E0FB"),
                textStyle: "ellipsis",
                widgetOptions: {
                  x: 30,
                  y: Text.getTextSize("Title").h,
                  w:
                    device.width -
                    getImageInfo("icons/ic_retreat-small.png").width -
                    100,
                },
              }),
            },
          ],
          text_view_count: 2,
          image_view: [
            {
              x:
                device.width -
                getImageInfo("icons/ic_retreat-small.png").width -
                40,
              y: Text.getTextSize("Title").text_size,
              w: 14,
              h: 24,
              key: "list_icon",
              action: true,
              auto_scale: true,
              auto_scale_obj_fit: true,
            },
          ],
          image_view_count: 1,
          item_height: 80,
        },
      ],
      item_config_count: 1,
      data_array: this.state.links,
      data_count: this.state.links.length,
      item_click_func: (item, index, data_key) => {
        push({
          url: "page/detail-page",
          params: {
            index,
          },
        });
      },
    });
  },
  onDestroy() {},
});
