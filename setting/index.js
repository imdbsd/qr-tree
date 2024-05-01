import { gettext } from "i18n";

AppSettingsPage({
  // 1. Define state
  props: { test: "" },
  state: {
    testValue: null,
    props: {},
  },
  build(props) {
    console.log("props: ", props);
    console.log("state: ", this.state);
    // 2. Get SettingsStorage
    this.getStorage(props);

    // 3. Logic
    const toggleButtonMap = {
      ["Hello Zepp OS"]: "Hello World",
      ["Hello World"]: "Hello Zepp OS",
    };

    // // 4. Return Render Function
    // return Button({
    //   label: this.state.testValue,
    //   style: {
    //     fontSize: "12px",
    //     borderRadius: "30px",
    //     background: "#D85E33",
    //     color: "white",
    //   },
    //   onClick: () => {
    //     // 5. Modify the data in settingsStorage in the callback function of the event
    //     props.settingsStorage.setItem(
    //       "testValue",
    //       toggleButtonMap[this.state.testValue]
    //     );
    //   },
    // });

    return View(
      {
        style: {
          padding: "100px 20px",
        },
      },
      [
        Button({
          label: this.state.testValue,
          style: {
            fontSize: "12px",
            borderRadius: "30px",
            background: "#D85E33",
            color: "white",
          },
          onClick: () => {
            // 5. Modify the data in settingsStorage in the callback function of the event
            props.settingsStorage.setItem(
              "testValue",
              toggleButtonMap[this.state.testValue]
            );
            // props.settingsStorage.clear();
          },
        }),
      ]
    );
  },
  getStorage(props) {
    this.state.testValue =
      props.settingsStorage.getItem("testValue") || "Hello World";
  },
});
