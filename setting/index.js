import { gettext } from "i18n";

AppSettingsPage({
  // 1. Define state
  props: { test: "as" },
  state: {
    testValue: null,
    clicked: false,
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
        View(
          {
            style: {
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              // backgroundColor: "red",
              display: "flex",
              paddingTop: "20px",
              justifyContent: "space-between",
              // height: "40px",
            },
          },
          [
            View(
              {
                style: {
                  backgroundColor: "red",
                  cursor: "pointer",
                  borderRadius: "100%",
                  padding: "4px",
                },
                onClick: () => {
                  // console.log("statenya: ", this.state.clicked);
                  // this.state.clicked = !this.state.clicked;
                  // console.log("statenya clicked: ", this.state.clicked);
                  props.settingsStorage.setItem("clicked", !this.state.clicked);
                },
              },
              Image({
                src: "https://raw.githubusercontent.com/imdbsd/gimbot-snake/master/src/assets/icons/github.png",
                width: 64,
                height: 64,
                style: {
                  height: "30px",
                  width: "auto",
                },
              })
            ),
            Text(
              {
                style: {
                  marginTop: "5px",
                  width: "100%",
                  display: "block",
                  fontSize: "14px",
                  color: "#6A707C",
                },
              },
              this.state.clicked ? "clicked" : "not yet"
              // this.state.clicked
            ),
            View(
              {
                style: {
                  backgroundColor: "yellow",
                  cursor: "pointer",
                  borderRadius: "100%",
                  padding: "4px",
                },
                onClick: () => {
                  console.log("clicked");
                },
              },
              Image({
                src: "https://raw.githubusercontent.com/imdbsd/gimbot-snake/master/src/assets/icons/github.png",
                width: 64,
                height: 64,
                style: {
                  height: "30px",
                  width: "auto",
                },
              })
            ),
          ]
        ),
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
    this.state.clicked = props.settingsStorage.getItem("clicked") || false;
  },
});
