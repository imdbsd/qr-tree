import { createWidget, event, prop, widget } from "@zos/ui";
import { push } from "@zos/router";
Page({
  state: {},
  onInit() {},
  build() {
    const fill_rect = createWidget(widget.FILL_RECT, {
      x: 125,
      y: 125,
      w: 230,
      h: 150,
      radius: 20,
      color: 0xfc6950,
    });

    fill_rect.addEventListener(event.CLICK_DOWN, (info) => {
      push({
        url: "page/detail-page",
        params: {
          index: 0,
        },
      });
    });
  },
  onDestroy() {},
});
