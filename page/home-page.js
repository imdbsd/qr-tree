import {
  createWidget,
  event,
  prop,
  text_style,
  widget,
  getImageInfo,
  align,
} from "@zos/ui";
import { push } from "@zos/router";
import Text from "../uikits/Text";
import { getDeviceInfo } from "@zos/device";
import { logger } from "../helpers/logger";
import hexToNumberColor from "../helpers/hexToNumberColor";

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
  },
  build() {
    const scrollList = createWidget(widget.SCROLL_LIST, {
      x: 0,
      y: 70,
      h: device.height,
      w: device.width,
      item_space: 20,
      item_enable_horizon_drag: true,
      item_drag_max_distance: -112,
      item_config: [
        {
          item_bg_radius: 10,
          text_view: [
            {
              action: true,
              ...Text.composeList("label", {
                size: "Subheadline",
                color: hexToNumberColor("#ffffff"),
                textStyle: "ellipsis",
                widgetOptions: {
                  w:
                    device.width -
                    getImageInfo("icons/ic_retreat-small.png").width -
                    40,
                },
              }),
            },
            {
              action: true,
              ...Text.composeList("url", {
                size: "Caption1",
                color: hexToNumberColor("#D2E0FB"),
                textStyle: "ellipsis",
                widgetOptions: {
                  x: 0,
                  y: Text.getTextSize("Subheadline").h,
                  w:
                    device.width -
                    getImageInfo("icons/ic_retreat-small.png").width -
                    40,
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
                20,
              y: Text.getTextSize("Subheadline").text_size,
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
        console.log(`scrollListItemClick index=${index}`);
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
