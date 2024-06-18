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
    inputLabel: "",
    inputBackgroundColor: "#000000",
    inputContent: "",
    inputLinkType: null,
    contentsTree: [],

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
            overflowX: "hidden",
          },
        },
        this.state.contentsTree.length > 0
          ? this.state.contentsTree.map((tree, index) =>
              View(
                {
                  style: {
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    marginBottom: "16px",
                    transition: "all 0.5s ease",
                    transform: `translateX(${
                      this.state.showDeleteAction ? "-75px" : "0px"
                    })`,
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
                        borderColor: tree.backgroundColor,
                        borderStyle: "solid",
                        width: "100%",
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
                          Text(
                            {
                              bold: true,
                            },
                            tree.label
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
                        tree.content
                      ),
                    ]
                  ),
                  View(
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: this.state.showDeleteAction ? 1 : 0,
                        transition: "all 0.5s ease",
                        marginLeft: 20,
                      },
                    },
                    View(
                      {
                        style: {
                          display: "flex",
                          backgroundColor: "#FA7070",
                          padding: "12px",
                          borderRadius: 8,
                        },
                        onClick: () => {
                          this.deleteContent(props, index);
                          props.settingsStorage.setItem(
                            "showDeleteAction",
                            !this.state.showDeleteAction
                          );
                        },
                      },
                      Image({
                        src: "https://raw.githubusercontent.com/imdbsd/qr-tree/master/assets/390x450-amazfit-active/icons/ic_delete-1.png",
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
              )
            )
          : View(
              {
                style: {
                  display: "flex",
                  position: "fixed",
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  top: 0,
                  left: 0,
                },
              },
              [
                Text(
                  {
                    style: {
                      size: "24px",
                      color: "#9CAFAA",
                    },
                    bold: true,
                    paragraph: true,
                  },
                  "No Link Data"
                ),
              ]
            )
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

              TextInput({
                label: "Label",
                value: this.state.inputLabel ? this.state.inputLabel : "",
                onChange: (val) => {
                  props.settingsStorage.setItem("inputLabel", val);
                },
                labelStyle: {
                  size: "16px",
                  marginBottom: "8px",
                  marginTop: "16px",
                  fontWeight: "bold",
                },
                subStyle: {
                  paddingBottom: this.state.inputLabel ? 0 : "16px",
                  borderBottom: "1px solid #cecece",
                },
              }),

              TextInput({
                label: "Background Color",
                value: this.state.inputBackgroundColor
                  ? this.state.inputBackgroundColor
                  : "",
                placeholder: "Default will be #000",
                onChange: (val) => {
                  props.settingsStorage.setItem("inputBackgroundColor", val);
                },
                labelStyle: {
                  size: "16px",
                  marginBottom: "8px",
                  marginTop: "16px",
                  fontWeight: "bold",
                },
                subStyle: {
                  paddingBottom: this.state.inputBackgroundColor ? 0 : "16px",
                  borderBottom: "1px solid #cecece",
                },
              }),

              TextInput({
                label: "Content",
                value: this.state.inputContent ? this.state.inputContent : "",
                placeholder: "Example: https://twitter.com/user",
                onChange: (val) => {
                  props.settingsStorage.setItem("inputContent", val);
                },
                labelStyle: {
                  size: "16px",
                  marginBottom: "8px",
                  marginTop: "16px",
                  fontWeight: "bold",
                },
                subStyle: {
                  paddingBottom: this.state.inputContent ? 0 : "16px",
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
                padding: "10px",
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
                height: "24px",
                width: "auto",
              },
            })
          ),

          View(
            {
              style: {
                backgroundColor: "#FA7070",
                cursor: "pointer",
                borderRadius: "100%",
                padding: "10px",
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
              src: "https://raw.githubusercontent.com/imdbsd/qr-tree/master/assets/390x450-amazfit-active/icons/ic_delete-1.png",
              width: 64,
              height: 64,
              style: {
                height: "24px",
                width: "auto",
              },
            })
          ),
        ]
      ),
      // Bottom bar End
    ]);
  },

  deleteContent(props, position) {
    const newCntents = this.state.contentsTree.filter(
      (_, index) => index !== position
    );

    props.settingsStorage.setItem("contentsTree", newCntents);
  },
  syncStorageAndState(props) {
    this.state.showModal = props.settingsStorage.getItem("showModal") || false;
    this.state.inputLabel = props.settingsStorage.getItem("inputLabel") || "";
    this.state.inputBackgroundColor =
      props.settingsStorage.getItem("inputBackgroundColor") || "";
    this.state.inputContent =
      props.settingsStorage.getItem("inputContent") || "";
    this.state.inputLinkType =
      props.settingsStorage.getItem("inputLinkType") || null;
    this.state.contentsTree =
      props.settingsStorage.getItem("contentsTree") || [];
    this.state.showDeleteAction =
      props.settingsStorage.getItem("showDeleteAction") || false;

    console.log("state: ", JSON.stringify(this.state));
  },

  closeModal(props) {
    props.settingsStorage.setItem("showModal", false);
    props.settingsStorage.setItem("inputLabel", "");
    props.settingsStorage.setItem("inputBackgroundColor", "#000000");
    props.settingsStorage.setItem("inputContent", "");
    props.settingsStorage.setItem("inputLinkType", null);
  },

  save(props) {
    const isHasAllValue =
      !!this.state.inputLabel &&
      !!this.state.inputContent &&
      !!this.state.inputBackgroundColor;

    if (isHasAllValue) {
      const contents = props.settingsStorage.getItem("contentsTree");

      const newContent = {
        label: this.state.inputLabel,
        // pinned: true,
        content: this.state.inputContent,
        backgroundColor: this.state.inputBackgroundColor,
      };

      props.settingsStorage.setItem(
        "contentsTree",
        Array.isArray(contents) ? [...contents, newContent] : [newContent]
      );
    }

    this.closeModal(props);
  },
});
