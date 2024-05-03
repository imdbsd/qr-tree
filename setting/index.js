import { gettext } from "i18n";
import { ZWSP } from "../helpers/zwsp";

AppSettingsPage({
  // 1. Define state
  props: { test: "as" },
  state: {
    showModal: false,
    inputLink: "",
    inputLinkType: null,
    props: {},
  },
  build(props) {
    console.log("props: ", props);
    console.log("state: ", this.state);

    this.getStorage(props);

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
              display: this.state.showModal ? "flex" : "none",
              position: "fixed",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              zIndex: 999,
              alignItems: "center",
              justifyContent: "center",
            },
          },
          [
            View({
              style: {
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                backgroundColor: "black",
                opacity: 0.5,
              },
              onClick: () => {
                props.settingsStorage.setItem("showModal", false);
              },
            }),
            View(
              {
                style: {
                  position: "relative",
                  backgroundColor: "#ffffff",
                  padding: "16px",
                  borderRadius: 8,
                  width: "90%",
                },
              },
              [
                Text(
                  {
                    style: {
                      size: "24px",
                      textAlign: "center",
                      marginBottom: "16px",
                    },
                    bold: true,
                    paragraph: true,
                  },
                  "Insert Link"
                ),
                Text(
                  {
                    style: {
                      size: "16px",
                      marginBottom: "8px",
                    },
                    bold: true,
                    paragraph: true,
                  },
                  "Social Media"
                ),
                Select({
                  options: [
                    { name: "Twitter", value: "twitter" },
                    { name: "Instagram", value: "instagram" },
                  ],
                  onChange: (val) => {
                    console.log(val);
                  },
                }),

                TextInput({
                  label: "Link",
                  value: this.state.inputLink ? this.state.inputLink : ZWSP,
                  placeholder: "Example: https://twitter.com/user",
                  onChange: (val) => {
                    console.log("valu: ", val);
                    props.settingsStorage.setItem("inputLink", val);
                  },
                  labelStyle: {
                    size: "16px",
                    marginBottom: "8px",
                    marginTop: "16px",
                    fontWeight: "bold",
                  },
                  subStyle: {
                    borderBottom: "1px solid #cecece",
                  },
                }),
                View(
                  {
                    style: {
                      marginTop: "16px",
                      display: "flex",
                      justifyContent: "end",
                    },
                  },
                  Button({
                    label: "Save",
                    style: {
                      fontSize: "12px",
                      borderRadius: "30px",
                      // background: "#AFC8AD",
                      backgroundColor: "#9CAFAA",
                      color: "white",
                    },
                    onClick: () => {
                      props.settingsStorage.setItem("showModal", false);
                    },
                  })
                ),
              ]
            ),
          ]
        ),
        View(
          {
            style: {
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              paddingTop: "10px",
              paddingBottom: "10px",
              justifyContent: "center",
              backgroundColor: "white",
            },
          },
          [
            View(
              {
                style: {
                  backgroundColor: "#9CAFAA",
                  cursor: "pointer",
                  borderRadius: "100%",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                },
                onClick: () => {
                  props.settingsStorage.setItem(
                    "showModal",
                    !this.state.showModal
                  );
                },
              },
              Image({
                src: "https://raw.githubusercontent.com/imdbsd/qr-tree/master/assets/390x450-amazfit-active/icons/ic_add.png",
                width: 64,
                height: 64,
                style: {
                  height: "32px",
                  width: "auto",
                },
              })
            ),
          ]
        ),
      ]
    );
  },
  getStorage(props) {
    this.state.showModal = props.settingsStorage.getItem("showModal") || false;
    this.state.inputLink = props.settingsStorage.getItem("inputLink") || "";
  },
});
