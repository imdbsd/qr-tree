import { gettext } from "i18n";
import { MessageBuilder } from "../helpers/message-builder/message-side";
import { CALL_EVENT } from "../helpers/messaging/constants";

const messageBuilder = new MessageBuilder();

AppSideService({
  onInit() {
    messageBuilder.listen(() => {
      console.log("App Side is Listening");
    });
  },

  onRun() {
    messageBuilder.on("request", (ctx) => {
      const payload = messageBuilder.buf2Json(ctx.request.payload);
      console.log("payload comming: ", payload);
      const { method, params } = payload;

      switch (method) {
        case "INITIAL_DATA": {
          return ctx.response({
            data: {
              text: "Hello",
              data: { success: true },
            },
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
