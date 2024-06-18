import { gettext } from "i18n";
import { MessageBuilder } from "../helpers/message-builder/message-side";
import {
  CALL_EVENT_TYPE,
  REQUEST_EVENT_TYPE,
} from "../helpers/messaging/constants";

const messageBuilder = new MessageBuilder();

AppSideService({
  onInit() {
    messageBuilder.listen(() => {
      console.log("App Side is Listening");
    });

    settings.settingsStorage.addListener(
      "change",
      async ({ key, newValue, oldValue }) => {
        console.log("key: ", key);
        console.log("newValue: ", newValue);
        if (key === "contentsTree") {
          messageBuilder.call({
            method: CALL_EVENT_TYPE.CONTENT_CHANGE,
            params: { contents: JSON.stringify(newValue) },
          });
        }
      }
    );
  },

  onRun() {
    messageBuilder.on("request", (ctx) => {
      const payload = messageBuilder.buf2Json(ctx.request.payload);
      console.log("payload comming: ", payload);
      const { method, params } = payload;

      switch (method) {
        case REQUEST_EVENT_TYPE.SYNC_LINKS: {
          console.log(
            "items: ",
            settings.settingsStorage.getItem("contentsTree")
          );
          return ctx.response({
            data: settings.settingsStorage.getItem("contentsTree") || [],
          });
        }
      }
    });

    messageBuilder.call({
      method: "UPDATE_TEXT",
      params: { text: "Hi frm SIDE SERVICE" },
    });
  },

  onDestroy() {},
});
