import { gettext } from "i18n";
import { PLATFORM_COLOR } from "../uikits/colors/appSettingColors";
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

    showDeleteAction: false,
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
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  },
                },
                [
                  View(
                    {
                      style: {
                        borderRadius: 8,
                        padding: "16px",
                        backgroundColor: "white",
                        borderWidth: "2px",
                        borderColor: PLATFORM_COLOR[tree.type],
                        borderStyle: "solid",
                        width: this.state.showDeleteAction ? "75%" : "100%",
                      },
                    },
                    [
                      View(
                        {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                          },
                        },
                        [
                          Image({
                            src: "https://raw.githubusercontent.com/imdbsd/qr-tree/master/assets/390x450-amazfit-active/icons/ic_add.png",
                            width: 64,
                            height: 64,
                            style: {
                              height: "16px",
                              width: "auto",
                              backgroundColor: "red",
                            },
                          }),
                          Text(
                            {
                              bold: true,
                              style: { marginLeft: "12px" },
                            },
                            tree.type
                          ),
                        ]
                      ),
                      Text(
                        {
                          paragraph: true,
                          style: {
                            color: "#cecece",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          },
                        },
                        tree.link
                      ),
                    ]
                  ),
                  ...(this.state.showDeleteAction
                    ? [
                        View(
                          {
                            style: {
                              display: "flex",
                              flex: "1",
                              alignItems: "center",
                              justifyContent: "center",
                            },
                          },
                          View(
                            {
                              style: {
                                display: "flex",
                                backgroundColor: "red",
                                padding: "12px",
                                borderRadius: 8,
                              },
                            },
                            Image({
                              src: "https://raw.githubusercontent.com/imdbsd/qr-tree/master/assets/390x450-amazfit-active/icons/ic_add.png",
                              width: 64,
                              height: 64,
                              style: {
                                height: "16px",
                                width: "auto",
                              },
                            })
                          )
                        ),
                      ]
                    : []),
                ]
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
                value: this.state.inputLink ? this.state.inputLink : "",
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
                  paddingBottom: this.state.inputLink ? 0 : "16px",
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
            justifyContent: "space-evenly",
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
                props.settingsStorage.setItem("showModal", true);
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

          View(
            {
              style: {
                backgroundColor: "red",
                cursor: "pointer",
                borderRadius: "100%",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              },
              onClick: () => {
                props.settingsStorage.setItem(
                  "showDeleteAction",
                  !this.state.showDeleteAction
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
    this.state.showDeleteAction =
      props.settingsStorage.getItem("showDeleteAction") || false;

    console.log("state: ", JSON.stringify(this.state));
  },

  closeModal(props) {
    props.settingsStorage.setItem("showModal", false);
    props.settingsStorage.setItem("inputLink", "");
    props.settingsStorage.setItem("inputLinkType", null);
  },

  save(props) {
    const inputLink = this.state.inputLink;
    const inputLinkType = this.state.inputLinkType;

    if (inputLink && inputLinkType) {
      let isValid = false;

      switch (inputLinkType) {
        case "twitter": {
          isValid = isTwitterURL(inputLink);
          break;
        }
        case "instagram": {
          isValid = isInstagramURL(inputLink);
          break;
        }
        case "youtube": {
          isValid = isYoutubeURL(inputLink);
          break;
        }
      }

      if (isValid) {
        const links = props.settingsStorage.getItem("linksTree");
        const newLink = {
          type: inputLinkType,
          link: inputLink,
        };
        props.settingsStorage.setItem(
          "linksTree",
          Array.isArray(links) ? [...links, newLink] : [newLink]
        );
      } else {
        console.error("Invalid link");
      }
    }

    this.closeModal(props);
  },
});
