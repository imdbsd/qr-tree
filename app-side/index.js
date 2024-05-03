import { gettext } from "i18n";
import { MessageBuilder } from "../helpers/message-builder/message-side";
import { CALL_EVENT } from "../helpers/messaging/constants";

const messageBuilder = new MessageBuilder();

AppSideService({
  onInit() {
    console.log(gettext("example"));

    messageBuilder.listen(() => {
      console.log("messageBuilder listen");
    });
    settings.settingsStorage.addListener(
      "change",
      ({ key, newValue, oldValue }) => {
        console.log("storage change: ", key, newValue, oldValue);
        let payload;

        switch (key) {
          case "testValue": {
            payload = {
              type: CALL_EVENT.TEST_VALUE_CHANGE,
              data: newValue,
            };
            break;
          }
        }

        if (payload) messageBuilder.call(payload);
      }
    );
    messageBuilder.on("request", (ctx) => {
      const payload = messageBuilder.buf2Json(ctx.request.payload);
      // if (payload.method === "GET_TODO_LIST") {
      //   ctx.response({
      //     data: { result: getTodoList() },
      //   });
      // } else if (payload.method === "ADD") {
      //   // 这里补充一个
      //   const todoList = getTodoList();
      //   const newTodoList = [
      //     ...todoList,
      //     String(Math.floor(Math.random() * 100)),
      //   ];
      //   settings.settingsStorage.setItem(
      //     "todoList",
      //     JSON.stringify(newTodoList)
      //   );

      //   ctx.response({
      //     data: { result: newTodoList },
      //   });
      // } else if (payload.method === "DELETE") {
      //   const { params: { index } = {} } = payload;
      //   const todoList = getTodoList();
      //   const newTodoList = todoList.filter((_, i) => i !== index);
      //   settings.settingsStorage.setItem(
      //     "todoList",
      //     JSON.stringify(newTodoList)
      //   );

      //   ctx.response({
      //     data: { result: newTodoList },
      //   });
      // }
    });
  },

  onRun() {
    // console.log("messaging: ", messaging.peerSocket);
    // console.log("messaging.peerSocket.send: ", messaging.peerSocket.send);
    // console.log("settings: ", settings);
    // settings.settingsStorage.addListener(
    //   "change",
    //   async ({ key, newValue, oldValue }) => {
    //     console.log("storage change: ", key, newValue, oldValue);
    //     if (key === "testValue") {
    //       const testValue = settings.settingsStorage.getItem("testValue");
    //       console.log("testValue: ", testValue);
    //       const bufferValue = Buffer.from(testValue);
    //       messaging.peerSocket.send(bufferValue.buffer);
    //     }
    //   }
    // );
  },

  onDestroy() {},
});
