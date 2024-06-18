import { localStorage } from "@zos/storage";
import { logger } from "../logger";

class AppStorage {
  static STORAGE_KEY = {
    LINKS_TREE: "links-tree",
    LAST_UPDATE: "last-update",
  };

  links = [];
  lastUpdate = null;

  constructor() {
    try {
      this.links = JSON.parse(
        localStorage.getItem(AppStorage.STORAGE_KEY.LINKS_TREE, "[]")
      );
    } catch {
      this.links = [];
    }
    // this.links = [
    //   {
    //     type: "whatsapp",
    //     label: "Whatsapp",
    //     pinned: true,
    //     url: "https://wa.me/6285737499966",
    //     backgroundColor: "#00A884",
    //   },
    //   {
    //     type: "qris",
    //     label: "Qris Jaje Iluh",
    //     url: "00020101021126650013ID.CO.BCA.WWW011893600014000144169302150008850014416930303UMI51440014ID.CO.QRIS.WWW0215ID10211341210320303UMI5204546253033605802ID5909JAJE ILUH6006BADUNG61058036162070703A0163044072",
    //     backgroundColor: "#FFC374",
    //   },
    //   {
    //     type: "trakteer",
    //     label: "Link minta duit",
    //     url: "https://trakteer.id/imdbsd/tip",
    //     backgroundColor: "#c53030",
    //   },
    //   {
    //     type: "steam",
    //     label: "Steam",
    //     url: "https://steamcommunity.com/profiles/76561198144189948/",
    //     backgroundColor: "#9BB8CD",
    //   },
    //   {
    //     type: "twitter",
    //     label: "Twitter",
    //     url: "https://twitter.com/Budisuryadarma",
    //     backgroundColor: "#1d9bf0",
    //   },
    //   {
    //     type: "instagram",
    //     label: "Instagram",
    //     url: "https://www.instagram.com/imdbsd",
    //     backgroundColor: "#78C1F3",
    //   },
    //   {
    //     type: "facebook",
    //     label: "FB",
    //     url: "https://www.facebook.com/imdbsd/",
    //     backgroundColor: "#0866ff",
    //   },
    //   {
    //     type: "github",
    //     label: "Github",
    //     url: "https://github.com/imdbsd",
    //     backgroundColor: "#B5C0D0",
    //   },
    // ];
    this.lastUpdate = localStorage.getItem(
      AppStorage.STORAGE_KEY.LAST_UPDATE,
      null
    );
  }

  getPinned() {
    const index = this.links.findIndex((link) => link.pinned);
    if (index > -1) {
      return [this.links[index], index];
    }
    return [undefined, -1];
  }

  getLinks() {
    return this.links;
  }

  getLinkAt(index) {
    return this.links[index];
  }

  getLastUpdate() {
    return this.lastUpdate;
  }

  /**
   * @param {Array<{type: string, link: string}>} newLinks
   */
  setLinks(newLinks) {
    localStorage.setItem(
      AppStorage.STORAGE_KEY.LINKS_TREE,
      JSON.stringify(newLinks)
    );
  }

  /***
   * @param {Date | string} newDate
   */
  setLastUpdate(newDate) {
    localStorage.setItem(
      AppStorage.STORAGE_KEY.LAST_UPDATE,
      typeof newDate === "string" ? newDate : newDate.toUTCString()
    );
  }
}

export default AppStorage;
