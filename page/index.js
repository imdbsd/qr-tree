import { getText } from "@zos/i18n";
import { Text } from "../uikits";

Page({
  build() {
    console.log(getText("example"));
    const textUi = new Text("Heelo World");
  },
});
