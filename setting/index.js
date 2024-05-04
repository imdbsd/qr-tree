import { gettext } from "i18n";
import { PLATFORM_COLOR } from "../uikits/colors/appSettingColors";
import { ZWSP } from "../helpers/zwsp";
import {
  isInstagramURL,
  isTwitterURL,
  isYoutubeURL,
} from "../helpers/regex/matcher";

AppSettingsPage({
  state: {
    showModal: false,
    inputLink: "",
    inputLinkType: null,
    linksTree: [],
    props: {},
  },
  build(props) {
    this.syncStorageAndState(props);

    return View({}, [
      View(
        {
          style: {
            padding: "20px",
          },
        },
        this.state.linksTree.length > 0
          ? this.state.linksTree.map((tree) =>
              View(
                {
                  style: {
                    borderRadius: 8,
                    padding: "16px",
                    backgroundColor: "white",
                    borderWidth: "2px",
                    borderColor: PLATFORM_COLOR[tree.type],
                    borderStyle: "solid",
                    marginBottom: "16px",
                  },
                },
                "card"
              )
            )
          : "No Data"
      ),
      // Modal Start
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
              this.closeModal(props);
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
                  { name: "Youtube", value: "youtube" },
                  { name: "Twitter", value: "twitter" },
                  { name: "Instagram", value: "instagram" },
                ],
                onChange: (val) => {
                  props.settingsStorage.setItem("inputLinkType", val);
                },
              }),

              TextInput({
                label: "Link",
                value: this.state.inputLink ? this.state.inputLink : ZWSP,
                placeholder: "Example: https://twitter.com/user",
                onChange: (val) => {
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
                    backgroundColor: "#9CAFAA",
                    color: "white",
                  },
                  onClick: () => {
                    this.save(props);
                  },
                })
              ),
            ]
          ),
        ]
      ),
      // Modal End
      // Bottom bar Start
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
      // Bottom bar End
    ]);
  },
  syncStorageAndState(props) {
    this.state.showModal = props.settingsStorage.getItem("showModal") || false;
    this.state.inputLink = props.settingsStorage.getItem("inputLink") || "";
    this.state.inputLinkType =
      props.settingsStorage.getItem("inputLinkType") || null;
    this.state.linksTree = props.settingsStorage.getItem("linksTree") || [];

    console.log("state: ", JSON.stringify(this.state));
  },

  closeModal(props) {
    props.settingsStorage.setItem("showModal", false);
    props.settingsStorage.setItem("inputLink", "");
    props.settingsStorage.setItem("inputLinkType", null);
  },

  save(props) {
    // let isValid = false;
    let isValid = true;

    switch (this.state.inputLinkType) {
      case "twitter": {
        isValid = isTwitterURL(this.state.inputLink);
      }
      case "instagram": {
        isValid = isInstagramURL(this.state.inputLink);
      }
      case "youtube": {
        isValid = isYoutubeURL(this.state.inputLink);
      }
    }

    if (isValid) {
      const links = props.settingsStorage.getItem("linksTree");
      const newLink = {
        type: this.state.inputLinkType,
        link: this.state.inputLink,
      };
      props.settingsStorage.setItem(
        "linksTree",
        Array.isArray(links) ? [...links, newLink] : [newLink]
      );
    } else {
      console.error("Invalid link");
    }

    this.closeModal(props);
  },
});
