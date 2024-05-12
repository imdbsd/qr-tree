import { createWidget, widget } from "@zos/ui";
import { push } from "@zos/router";
Page({
  state: {},
  onInit() {
    const img_button = createWidget(widget.BUTTON, {
      x: (480 - 96) / 2,
      y: 120,
      text: "Hello",
      w: -1,
      h: -1,
      click_func: () => {
        console.log("button click");
        push({
          url: "page/detail-page",
          params: {
            index: 1,
          },
        });
      },
    });
  },
  build() {},
  onDestroy() {},
});
